<template>
  <BaseFavouriteCards v-if="has_user" :post_bookmarks_data="post_bookmarks" />
  <BaseNoData v-else message="No data to show, please sign in" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseFavouriteCards from "@/components/favourites/BaseFavouriteCards";
import BaseNoData from "@/components/BaseNoData";
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "FavouriteIndex",
  mixins: [postBookmarkMixins],
  async asyncData({ store }) {
    const access_token = localStorage.getItem("access_token");
    if (!_.isNil(access_token)) {
      await store.dispatch("auth/GET_ME");
    }
  },
  components: {
    BaseFavouriteCards,
    BaseNoData,
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
  async fetch() {
    try {
      this.SET_POST_BOOKMARK_LOADING({ data: true });

      await this.GET_POST_BOOKMARKS_PAGINATED();
    } catch (error) {
      console.error(error);
    } finally {
      this.SET_POST_BOOKMARK_LOADING({ data: false });
    }
  },
};
</script>

<style></style>
