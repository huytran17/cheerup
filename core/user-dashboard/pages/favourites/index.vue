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
  async asyncData({ store }) {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!_.isNil(access_token)) {
        await store.dispatch("auth/GET_ME");
      }

      const has_user = store.getters["auth/has_user"];
      if (!has_user) {
        return;
      }

      await store.dispatch("post-bookmark/GET_POST_BOOKMARKS_PAGINATED");
    } catch (err) {
      console.log(err);
    }
  },
  mixins: [postBookmarkMixins],
  components: {
    BaseFavouriteCards,
    BaseNoData,
  },
  computed: {
    ...mapGetters({
      has_user: "auth/has_user",
    }),
  },
};
</script>

<style></style>
