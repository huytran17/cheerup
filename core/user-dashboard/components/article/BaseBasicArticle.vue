<template>
  <div class="position-relative">
    <div class="image-on-hover-container">
      <div class="image-on-hover">
        <v-img
          :src="post_data.thumbnail.url"
          :lazy-src="post_data.thumbnail.url"
          :alt="$t(post_data.title)"
          contain
          class="clickable"
        ></v-img>
      </div>
    </div>

    <div
      class="d-flex flex-column position-absolute article-details white mx-auto py-6 px-2 px-sm-4 px-md-8"
    >
      <div class="d-flex justify-center">
        <v-chip
          class="ma-1"
          :class="is_small_screen || is_mobile ? 'text-small' : 'text-caption'"
          color="brick clickable app-title text-uppercase"
          label
          text-color="white"
          v-for="(category, index) in post_data.categories"
          :key="index"
          small
        >
          <span
            class="app-title white--text"
            v-html="$t(category.title)"
          ></span>
        </v-chip>
      </div>
      <div
        class="text-body-2 text-sm-body-1 text-md-h6 text-center pt-3 pt-md-4 clickable"
      >
        <span class="app-title a-hover" v-html="post_data.title"></span>
      </div>
      <div class="text-caption text-sm-body-2 text-center pt-2 pt-md-4">
        <span class="app-body">{{
          formatDate(post_data.created_at, "LL")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
export default {
  name: "BaseBasicArticle",
  mixins: [systemMixins],
  props: {
    post_data: {
      type: Object,
      default() {
        return {
          title:
            "Being deeply loved by someone gives you strength while loving someone deeply gives you courage",
          created_at: "2022-06-26T09:47:50.788+00:00",
          categories: [
            {
              title: "Dating",
            },
            {
              title: "Travel",
            },
          ],
          thumbnail: {
            url: require("@/assets/images/sample/post1.jpg"),
          },
        };
      },
    },
  },
};
</script>

<style scoped>
.article-details {
  width: 90%;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
}
:deep(.v-chip) {
  border-radius: 0 !important;
}
</style>
