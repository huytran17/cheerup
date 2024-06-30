<template>
  <BaseArticles />
</template>

<script>
import BaseArticles from "@/components/article/BaseArticles";
import { get } from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "IndexPage",
  async asyncData({ store, route }) {
    try {
      await store.dispatch("post/GET_POSTS_PAGINATED", {
        user_id: get(store.getters["auth/me"], "_id"),
        query: route.query.search,
      });
    } catch (error) {
      console.error(error);
    }
  },
  transition: {
    async beforeEnter() {
      await this.$i18n.finalizePendingLocaleChange();
    },
  },
  components: {
    BaseArticles,
  },

  computed: {
    ...mapGetters({
      me: "auth/me",
    }),
  },

  watch: {
    "$route.query": {
      async handler(query) {
        await this.GET_POSTS_PAGINATED({
          query: query.search,
        });
      },
    },
  },

  methods: {
    ...mapActions({
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),
  },
};
</script>
