<template>
  <BaseFavouriteCards :post_bookmarks_data="post_bookmarks" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseFavouriteCards from "@/components/favourites/BaseFavouriteCards";
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "FavouriteIndex",
  mixins: [postBookmarkMixins],
  components: {
    BaseFavouriteCards,
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
  async fetch() {
    try {
      if (!this.has_user) {
        this.$router.push(this.localePath("/"));
        return;
      }

      await this.GET_POST_BOOKMARKS_PAGINATED();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style></style>
