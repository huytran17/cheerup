<template>
  <BaseFavouriteCards v-if="has_user" />
  <BaseNoData v-else message="No data available, please sign in" />
</template>

<script>
import { mapGetters } from "vuex";
import { seo_post_schema } from "../../seo";
import BaseFavouriteCards from "@/components/favourites/BaseFavouriteCards";
import BaseNoData from "@/components/BaseNoData";
import postBookmarkMixins from "@/mixins/post-bookmark";

export default {
  name: "FavouriteIndex",
  layout: "authenticated",
  head() {
    return {
      ...seo_post_schema,
      title: this.$t("Favourites"),
    };
  },
  async asyncData({ store }) {
    try {
      const has_user = store.getters["auth/has_user"];
      if (!has_user) {
        return;
      }

      await store.dispatch("post-bookmark/GET_POST_BOOKMARKS_PAGINATED");
    } catch (error) {
      console.error(error);
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
