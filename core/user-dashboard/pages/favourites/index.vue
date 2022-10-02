<template>
  <BaseFavouriteCards :post_bookmarks_data="post_bookmarks" />
</template>

<script>
import BaseFavouriteCards from "@/components/favourites/BaseFavouriteCards";
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "FavouriteIndex",
  mixins: [postBookmarkMixins],
  components: {
    BaseFavouriteCards,
  },
  async fetch() {
    try {
      await this.GET_POST_BOOKMARKS_PAGINATED();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
