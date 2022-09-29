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

      <div class="text-uppercase text--small grey--text text-center">
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
        max-height="500"
      ></v-img>
    </div>

    <div class="text__description matte__black--text">
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

    <div class="d-flex justify-space-between">
      <div class="d-flex flex-column justify-center">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="brick" v-bind="attrs" v-on="on" class="clickable"
              >mdi-heart-outline</v-icon
            >
          </template>
          <div class="text-body-2 d-flex flex-column justify-center">
            <span class="app-body" v-html="$t('Add to favourite')"></span>
          </div>
        </v-tooltip>
      </div>
      <div class="text-center text-sm-right pt-2 pt-sm-0">
        <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.FACEBOOK })">
          <v-icon color="facebook">mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.TWITTER })">
          <v-icon color="twitter">mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="sharePost({ type: SOCIAL_MEDIA_TYPES.GOOGLE_PLUS })"
        >
          <v-icon color="google_plus">mdi-google-plus</v-icon>
        </v-btn>
        <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.PINTEREST })">
          <v-icon color="pinterest">mdi-pinterest</v-icon>
        </v-btn>
        <v-btn icon @click="sharePost({ type: SOCIAL_MEDIA_TYPES.LINKEDIN })">
          <v-icon color="linkedin">mdi-linkedin</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import { SOCIAL_MEDIA_TYPES } from "@/constants";
export default {
  name: "BaseArticle",
  mixins: [systemMixins],
  props: {
    post_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      SOCIAL_MEDIA_TYPES: SOCIAL_MEDIA_TYPES,
    };
  },
  computed: {
    author_name() {
      return _.get(this.post_data, "author.full_name");
    },
    has_categories() {
      return !_.isEmpty(this.post_data.categories);
    },
  },
  methods: {
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
</style>
