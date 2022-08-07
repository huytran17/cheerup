<template>
  <div>---oooooooooooooooooooooooooooooooooooooooooooooooooo</div>
</template>

<script>
import authMixins from "@/mixins/auth";
export default {
  name: "IndexPage",
  mixins: [authMixins],
  async fetch() {
    try {
      await this.GET_ME();
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
