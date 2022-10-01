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
          @click="$router.push(localePath(`/category/${category._id}`))"
        >
          <span v-html="$t(category.title)"></span>
        </v-chip>
      </div>

      <div class="text-h5 text-sm-h4 text-uppercase text-center py-4">
        <span
          class="app-body post__title position-relative clickable"
          v-html="$t(post_data.title)"
          @click="$router.push(localePath(`/post/${post_data._id}`))"
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
      </div>
    </div>

    <div class="d-flex justify-center pt-7 pb-6">
      <v-img
        :src="post_data.thumbnail_url"
        :lazy-src="post_data.thumbnail_url"
        :alt="post_data.title"
        cover
        max-height="400"
      ></v-img>
    </div>

    <div class="text__description matte__black--text text__ellipsis">
      <span class="app-body" v-html="$t(post_data.description)"></span>
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
            icon
            @click="addPostToBookmark"
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
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.GOOGLE_PLUS })"
        :small="is_mobile"
      >
        <v-icon color="google_plus" :small="is_mobile">mdi-google-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.PINTEREST })"
        :small="is_mobile"
      >
        <v-icon color="pinterest" :small="is_mobile">mdi-pinterest</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="sharePost({ type: SOCIAL_MEDIA_TYPES.LINKEDIN })"
        :small="is_mobile"
      >
        <v-icon color="linkedin" :small="is_mobile">mdi-linkedin</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
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
      me: "auth/me",
    }),

    author_name() {
      return _.get(this.post_data, "author.full_name");
    },

    has_categories() {
      return !_.isEmpty(this.post_data.categories);
    },
  },
  methods: {
    async addPostToBookmark() {
      try {
        const post_bookmark_data = {
          user: _.get(this.me, "_id"),
          post: _.get(this.post_data, "_id"),
        };

        await this.CREATE_OR_DELETE_POST_BOOKMARK({ data: post_bookmark_data });

        this.is_bookmarked = !this.is_bookmarked;
      } catch (error) {
        console.log(error);
      }
    },

    sharePost({ type }) {
      const current_url_origin = window.location.origin;
      const post_url = `${current_url_origin}/post/${this.post_data._id}`;

      let share_url = "";
      switch (type) {
        case SOCIAL_MEDIA_TYPES.FACEBOOK:
          share_url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            post_url
          )}`;
          break;
        case SOCIAL_MEDIA_TYPES.TWITTER:
          share_url = `https://twitter.com/intent/tweet?text=${
            this.post_data.title
          }?url=${encodeURIComponent(post_url)}`;
          break;
        case SOCIAL_MEDIA_TYPES.GOOGLE_PLUS:
          share_url = `https://plus.google.com/share?url=${encodeURIComponent(
            post_url
          )}`;
          break;
        case SOCIAL_MEDIA_TYPES.PINTEREST:
          share_url = `http://pinterest.com/pin/create/button?url=${encodeURIComponent(
            post_url
          )}&description=${this.post_data.description}&media=${
            this.post_data.thumbnail_url
          }`;
          break;
        case SOCIAL_MEDIA_TYPES.LINKEDIN:
          share_url = `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            post_url
          )}&title=${this.post_data.title}&source=${this.post_data.source}`;
          break;
      }

      if (share_url) {
        window.open(share_url, "_blank");
      }
    },
  },

  created() {
    this.is_bookmarked = _.get(this.post_data, "is_bookmarked", false);
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
.text__ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
