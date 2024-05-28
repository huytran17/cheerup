<template>
  <BaseArticles />
</template>

<script>
import { get } from "lodash";
import { mapGetters, mapActions } from "vuex";
import BaseArticles from "@/components/article/BaseArticles";
import initialPrivateSocketIO from "@/config/socket.io/private-client";

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

  fetch() {
    initialPrivateSocketIO({ user_id: this.me._id });
  },
};
</script>
