<template>
  <BaseArticles />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
export default {
  name: "IndexPage",
  async asyncData({ store }) {
    try {
      await store.dispatch("post/GET_POSTS_PAGINATED", {
        user_id: _.get(store.getters["auth/me"], "_id"),
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
