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
          <span class="app-body" v-html="category.title"></span>
        </v-chip>
      </div>

      <div class="text-h6 text-sm-h4 text-uppercase text-center pb-4 pt-2">
        <span
          class="app-body post__title position-relative clickable"
          v-html="post_data.title"
          @click="$router.push(localePath(`/post/${post_data.slug}`))"
        ></span>
      </div>

      <div
        class="text-uppercase grey--text text-center"
        :class="is_mobile ? 'text--small' : 'text__description'"
      >
        <span class="app-body">{{
          formatDate(post_data.created_at, "LL")
        }}</span>
        <span>/</span>
        <span class="app-body">{{ author_name }}</span>
        <span>/</span>
        <span class="app-body">{{ reading_time }}</span>
      </div>
    </div>

    <div class="d-flex justify-center pt-6 pb-3 pb-sm-4">
      <v-img
        :src="post_data.thumbnail_url"
        :lazy-src="post_data.thumbnail_url"
        :alt="post_data.title"
        cover
        max-height="400"
      ></v-img>
    </div>

    <div
      class="post__description text__description matte__black--text"
      v-line-clamp="2"
    >
      <span
        class="app-body text--ellipsis"
        v-html="post_data.description"
      ></span>
    </div>

    <div class="text-left">
      <div class="text-caption grey--text text-uppercase">
        <span
          class="app-body"
          v-html="
            $tc(`{count} Comment`, post_data.comments_count, {
              count: post_data.comments_count,
            })
          "
        ></span>
      </div>
    </div>

    <div class="text-center text-sm-right pt-2 pt-sm-0">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-private
            icon
            @click="addOrDeletePostToBookmark"
            v-bind="attrs"
            v-on="on"
            :small="is_mobile"
          >
            <v-icon color="brick" class="clickable" :small="is_mobile">
              {{ is_bookmarked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
            >
          </v-btn>
        </template>
        <div class="text-body-2 d-flex flex-column justify-center">
          <span class="app-body" v-html="$t('Add to favourite')"></span>
        </div>
      </v-tooltip>
      <v-btn
        icon
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.FACEBOOK })"
        :small="is_mobile"
      >
        <v-icon color="facebook" :small="is_mobile">mdi-facebook</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.TWITTER })"
        :small="is_mobile"
      >
        <v-icon color="twitter" :small="is_mobile">mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.PINTEREST })"
        :small="is_mobile"
      >
        <v-icon color="pinterest" :small="is_mobile">mdi-pinterest</v-icon>
      </v-btn>
      <v-btn icon @click="copyLinkToClipboard" :small="is_mobile">
        <v-icon color="facebook" :small="is_mobile">mdi-link-variant</v-icon>
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
      const current_url_origin = window.location.origin;
      const post_url = `${current_url_origin}/post/${this.post_data._id}`;

      let share_url = "";
      const encodedURI = encodeURIComponent(post_url);

      switch (type) {
        case SOCIAL_MEDIA_TYPES.FACEBOOK:
          share_url = `https://www.facebook.com/share.php?u=${encodedURI}`;
          break;
        case SOCIAL_MEDIA_TYPES.TWITTER:
          share_url = `https://twitter.com/intent/tweet?text=${this.post_data?.title}?url=${encodedURI}`;
          break;
        case SOCIAL_MEDIA_TYPES.PINTEREST:
          share_url = `http://pinterest.com/pin/create/button?url=${encodedURI}&description=${this.post_data?.description}&media=${this.post_data?.thumbnail_url}`;
          break;
      }

      share_url && window.open(share_url, "_blank");
    },

    copyLinkToClipboard() {
      const post_url = `${process.env.BASE_URL}/post/${this.post_data.slug}`;

      navigator.clipboard.writeText(post_url);
      this.$toast.success(this.$t("Coppied to clipboard!"));
    },
  },

  created() {
    this.is_bookmarked = get(this.post_data, "is_bookmarked", false);
  },
};
</script>

<style scoped>
:deep(.v-chip--label) {
  border-radius: 0 !important;
}
.post__title:hover {
  color: var(--color-title-hover);
}
.post__title {
  transition: 0.1s linear all;
}
:deep(button.v-icon::after) {
  background: transparent !important;
}
</style>
