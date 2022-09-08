<template>
  <div>
    <div class="pt-15">
      <BaseSlider :posts="latest_posts" />
    </div>
    <v-row>
      <v-col cols="12" md="8">
        <BaseArticles :posts_data="posts" />
      </v-col>
      <v-col cols="12" md="4"> </v-col>
    </v-row>
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import BaseSlider from "@/components/slider/BaseSlider";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  mixins: [postMixins],
  components: {
    BaseSlider,
    BaseArticles,
  },

  async fetch() {
    try {
      await Promise.all([this.GET_LATEST_POSTS(), this.GET_POSTS_PAGINATED()]);
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
