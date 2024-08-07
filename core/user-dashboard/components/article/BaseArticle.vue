<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <div v-if="has_categories" class="text-center">
        <v-chip
          v-for="(category, index) in post_data.categories"
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
        class="text-h6 text-sm-h4 text-uppercase text-center pb-0 pb-sm-3 pt-2"
      >
        <span
          class="position-relative clickable"
          @click="$router.push(localePath(`/post/${post_data.slug}`))"
          >{{ post_data.title }}</span
        >
      </div>

      <div
        class="text-uppercase brick--text text-center text-body-3 text-sm-body-2"
      >
        <span>{{ formatDate(post_data.created_at, "LL") }}</span>
        <span>/</span>
        <span>{{ author_name }}</span>
        <span>/</span>
        <span>{{ reading_time }}</span>
      </div>
    </div>

    <div class="d-flex justify-center pt-4 pt-sm-6 pb-3">
      <v-img
        :src="post_data.thumbnail_url"
        :lazy-src="post_data.thumbnail_url"
        :alt="post_data.title"
        cover
        max-height="400"
      ></v-img>
    </div>

    <div
      class="post__description text__content matte__black--text"
      v-line-clamp="2"
    >
      <span class="text--ellipsis" v-html="post_data.description"></span>
    </div>

    <div class="text-left">
      <div class="text-caption brick--text text-uppercase">
        {{
          $tc(`{count} Comment`, post_data.comments_count, {
            count: post_data.comments_count,
          })
        }}
      </div>
    </div>

    <div class="text-center text-sm-right pt-2 pt-sm-0">
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
      <v-btn icon @click="copyLinkToClipboard">
        <v-icon color="facebook">mdi-link-variant</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { get, isEmpty } from "lodash";
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";
import postBookmarkMixins from "@/mixins/post-bookmark";

import { SOCIAL_MEDIA_TYPES } from "@/constants";
export default {
  name: "BaseArticle",
  mixins: [systemMixins, postBookmarkMixins],
  props: {
    post_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      SOCIAL_MEDIA_TYPES: SOCIAL_MEDIA_TYPES,
      is_bookmarked: false,
    };
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),

    author_name() {
      return get(this.post_data, "author.full_name");
    },

    reading_time() {
      return get(this.post_data, "reading_time.text");
    },

    has_categories() {
      return !isEmpty(this.post_data.categories);
    },
  },
  methods: {
    async addOrDeletePostToBookmark() {
      try {
        if (!this.has_user) {
          return;
        }

        const post_bookmark_data = {
          post: get(this.post_data, "_id"),
        };

        await this.CREATE_OR_DELETE_POST_BOOKMARK({ data: post_bookmark_data });

        this.is_bookmarked = !this.is_bookmarked;

        await this.COUNT_POST_BOOKMARKS();
      } catch (error) {
        console.error(error);
      }
    },

    sharePost({ type }) {
      const post_url = `${process.env.BASE_URL}/post/${this.post_data.slug}`;

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
        const post_url = `${process.env.BASE_URL}/post/${this.post_data.slug}`;

        await navigator.clipboard.writeText(post_url);
        this.$toast.success(this.$t("Coppied to clipboard!"));
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.is_bookmarked = get(this.post_data, "is_bookmarked", false);
  },
};
</script>

<style scoped>
.v-chip--label {
  border-radius: 0 !important;
}
button.v-icon::after {
  background: transparent !important;
}
</style>
