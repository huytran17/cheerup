<template>
  <BasePostPanel :post_data="post" />
</template>

<script>
import postMixins from "@/mixins/post";
import BasePostPanel from "@/components/post/BasePostPanel";
export default {
  name: "PostPanel",
  mixins: [postMixins],
  components: {
    BasePostPanel,
  },
  async fetch() {
    try {
      const post_id = this.$route.params.id;
      await this.GET_POST({ id: post_id });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
