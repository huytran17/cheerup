<template>
  <BaseArticles />
</template>

<script>
import { get } from "lodash";
import { mapGetters, mapActions } from "vuex";
import { seo_post_schema } from "../../seo";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "PostsPage",
  head() {
    return seo_post_schema;
  },
  async asyncData({ store }) {
    try {
      await store.dispatch("post/GET_POSTS_PAGINATED", {
        user_id: get(store.getters["auth/me"], "_id"),
        sorts: {
          views: -1,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    BaseArticles,
  },

  computed: {
    ...mapGetters({
      me: "auth/me",
    }),
  },

  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),
  },
};
</script>
