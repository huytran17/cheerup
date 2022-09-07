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
export default {
  name: "IndexPage",
  mixins: [postMixins],
  components: {
    BaseSlider,
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
