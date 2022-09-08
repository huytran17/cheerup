<template>
  <div>
    <div class="pt-15">
      <BaseSlider :posts="latest_posts" />
    </div>
  </div>
</template>

<script>
import postMixins from "@/mixins/post";
import BaseSlider from "@/components/slider/BaseSlider";
import BaseArticle from "@/components/article/BaseArticle";
export default {
  name: "IndexPage",
  mixins: [postMixins],
  components: {
    BaseSlider,
    BaseArticle
  },

  async fetch() {
    try {
      await this.GET_LATEST_POSTS();
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
