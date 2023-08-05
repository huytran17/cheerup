<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <div v-if="has_categories" class="d-flex justify-center">
        <v-chip
          v-for="(category, index) in post.categories"
          :key="index"
          class="ma-1 clickable"
          :color="category.badge_color"
          label
          text-color="white"
          small
          @click="$router.push(localePath(`/category/${category.slug}`))"
        >
          <span v-html="category.title" class="app-body lh-24"></span>
        </v-chip>
      </div>

      <div
        class="text-h6 text-sm-h4 text-uppercase text-center pt-2 pb-0 pb-sm-3"
      >
        <span class="app-body position-relative" v-html="post.title"></span>
      </div>

      <div
        class="text-uppercase brick--text text-center text-body-3 text-sm-body-2"
      >
        <span class="app-body">{{ formatDate(post.created_at, "LL") }}</span>
        <span>/</span>
        <span class="app-body">{{ author_name }}</span>
        <span>/</span>
        <span class="app-body">{{ reading_time }}</span>
      </div>
    </div>

    <div class="d-flex justify-center pt-4 pt-sm-6 pb-3">
      <v-img
        :src="post.thumbnail_url"
        :lazy-src="post.thumbnail_url"
        :alt="post.title"
        cover
        max-height="400"
      ></v-img>
    </div>

    <div class="text__content matte__black--text font-italic">
      <span class="app-body" v-html="post.description"></span>
    </div>

    <div class="text__content matte__black--text">
      <span class="app-body" v-html="post.content"></span>
    </div>

    <div v-if="has_tags" class="text--small">
      <v-icon small color="black">mdi-tag</v-icon>
      <span class="app-body">
        <span class="text-uppercase" v-html="$t('Tags: ')"></span>
        <span v-for="(tag, index) in post.tags" :key="`tag-${index}`"
          ><v-chip
            class="px-1 clickable white--text mr-1"
            color="brick"
            x-small
            @click="searchByTag({ tag })"
          >
            {{ tag }}
          </v-chip></span
        >
      </span>
    </div>

    <div v-if="post.source" class="text-body-2 mt-2">
      <span class="app-body">
        <span v-html="$t('Source: ')"></span>
        <span class="post__source" v-html="post.source"></span>
      </span>
    </div>

    <div class="text-center text-sm-right pt-3 pt-sm-2">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-private="$t('You need to be logged in to perform this action')"
            icon
            @click="addOrDeletePostToBookmark"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="brick" class="clickable">
              {{ is_bookmarked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
            >
          </v-btn>
        </template>
        <div class="text-body-2 d-flex flex-column justify-center">
          <span
            class="app-body"
            v-html="
              $t(is_bookmarked ? 'Remove from favourite' : 'Add to favourite')
            "
          ></span>
        </div>
      </v-tooltip>
      <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.FACEBOOK })">
        <v-icon color="facebook">mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.TWITTER })">
        <v-icon color="twitter">mdi-twitter</v-icon>
      </v-btn>
      <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.PINTEREST })">
        <v-icon color="pinterest">mdi-pinterest</v-icon>
      </v-btn>
      <v-btn icon @click="exportPdf">
        <v-icon color="brick">mdi-download</v-icon>
      </v-btn>
      <v-btn icon @click="copyLinkToClipboard">
        <v-icon color="facebook">mdi-link-variant</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import { mapActions, mapGetters } from "vuex";
import systemMixins from "@/mixins/system";
import { SOCIAL_MEDIA_TYPES } from "@/constants";
export default {
  name: "BasePostPanel",
  mixins: [systemMixins],
  data() {
    return {
      SOCIAL_MEDIA_TYPES: SOCIAL_MEDIA_TYPES,
      is_bookmarked: false,
    };
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
      post: "post/post",
    }),

    reading_time() {
      return get(this.post, "reading_time.text");
    },

    author_name() {
      return get(this.post, "author.full_name");
    },

    has_categories() {
      return !isEmpty(this.post.categories);
    },

    has_tags() {
      return !isEmpty(this.post.tags);
    },
  },
  methods: {
    ...mapActions({
      CREATE_OR_DELETE_POST_BOOKMARK:
        "post-bookmark/CREATE_OR_DELETE_POST_BOOKMARK",
      COUNT_POST_BOOKMARKS: "post-bookmark/COUNT_POST_BOOKMARKS",
      EXPORT_POST_PDF: "post/EXPORT_POST_PDF",
    }),

    async exportPdf() {
      try {
        const pdf_data = await this.EXPORT_POST_PDF({ _id: this.post._id });

        const url = window.URL.createObjectURL(
          new Blob([new Uint8Array(pdf_data.buffer.data).buffer])
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${pdf_data.name}.pdf`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error(error);
      }
    },

    searchByTag({ tag }) {
      this.$router.push({
        path: this.localePath("/tag"),
        query: { tag },
      });
    },

    async addOrDeletePostToBookmark() {
      try {
        if (!this.has_user) {
          return;
        }

        const post_bookmark_data = {
          post: get(this.post, "_id"),
        };

        await this.CREATE_OR_DELETE_POST_BOOKMARK({ data: post_bookmark_data });

        this.is_bookmarked = !this.is_bookmarked;

        await this.COUNT_POST_BOOKMARKS();
      } catch (error) {
        console.error(error);
      }
    },

    sharePost({ type }) {
      const post_url = `${process.env.BASE_URL}/post/${this.post.slug}`;

      let share_url = "";
      const encodedURI = encodeURIComponent(post_url);

      switch (type) {
        case SOCIAL_MEDIA_TYPES.FACEBOOK:
          share_url = `https://www.facebook.com/share.php?u=${encodedURI}`;
          break;
        case SOCIAL_MEDIA_TYPES.TWITTER:
          share_url = `https://twitter.com/intent/tweet?text=${this.post?.title}?url=${encodedURI}`;
          break;
        case SOCIAL_MEDIA_TYPES.PINTEREST:
          share_url = `http://pinterest.com/pin/create/button?url=${encodedURI}&description=${this.post?.description}&media=${this.post?.thumbnail_url}`;
          break;
      }

      share_url && window.open(share_url, "_blank");
    },
    async copyLinkToClipboard() {
      try {
        const post_url = `${process.env.BASE_URL}/post/${this.post.slug}`;

        await navigator.clipboard.writeText(post_url);
        this.$toast.success(this.$t("Coppied to clipboard!"));
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.is_bookmarked = get(this.post, "is_bookmarked", false);
  },
};
</script>

<style scoped>
:deep(.v-chip--label) {
  border-radius: 0 !important;
}
:deep(.post__source *) {
  display: inline !important;
  text-decoration: none !important;
}
</style>
