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
          <span class="lh-24">{{ category.title }}</span>
        </v-chip>
      </div>

      <div
        class="text-h6 text-sm-h4 text-uppercase text-center pt-2 pb-0 pb-sm-3"
      >
        <span class="position-relative">{{ post.title }}</span>
      </div>

      <div
        class="text-uppercase brick--text text-center text-body-3 text-sm-body-2"
      >
        <span>{{ formatDate(post.created_at, "LL") }}</span>
        <span>/</span>
        <span>{{ author_name }}</span>
        <span>/</span>
        <span>{{ reading_time }}</span>
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
      <span v-html="post.description"></span>
    </div>

    <div class="text__content matte__black--text">
      <span v-html="post.content"></span>
    </div>

    <div v-if="has_tags" class="text--small">
      <v-icon small color="black">mdi-tag</v-icon>
      <span class="text-uppercase">{{ $t("Tags: ") }}</span>
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
    </div>

    <div v-if="post.source" class="text-body-2 mt-2">
      <span class="post-source">
        <span>{{ $t("Source: ") }}</span>
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
          {{ $t(is_bookmarked ? "Remove from favourite" : "Add to favourite") }}
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
      <v-btn icon @click="exportPdf" :disabled="is_app_loading">
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
      is_app_loading: "is_app_loading",
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

        await this.CREATE_OR_DELETE_POST_BOOKMARK({
          data: {
            post: this.post?._id,
          },
        });

        this.is_bookmarked = !this.is_bookmarked;

        await this.COUNT_POST_BOOKMARKS();
      } catch (error) {
        console.error(error);
      }
    },

    sharePost({ type }) {
      const post_url = `${process.env.BASE_URL}/post/${this.post.slug}`;

      const encodedURI = encodeURIComponent(post_url);

      const social_urls = {
        [SOCIAL_MEDIA_TYPES.FACEBOOK]: `https://www.facebook.com/share.php?u=${encodedURI}`,
        [SOCIAL_MEDIA_TYPES.TWITTER]: `https://twitter.com/intent/tweet?text=${this.post_data?.title}?url=${encodedURI}`,
        [SOCIAL_MEDIA_TYPES.PINTEREST]: `http://pinterest.com/pin/create/button?url=${encodedURI}&description=${this.post_data?.description}&media=${this.post_data?.thumbnail_url}`,
      };

      social_urls[type] && window.open(social_urls[type], "_blank");
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

<style lang="scss" scoped>
.v-chip--label {
  border-radius: 0 !important;
}
.post__source {
  display: inline !important;
  text-decoration: none !important;
}
.post-source {
  display: flex;
  gap: toRem(4);
}
</style>
