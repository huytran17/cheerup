<template></template>

<script>
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "BaseFavouriteCards",
  mixins: [postBookmarkMixins],
  async fetch() {
    try {
      await this.GET_POST_BOOKMARKS_PAGINATED({
        page: 1,
        entries_per_page: 15,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
