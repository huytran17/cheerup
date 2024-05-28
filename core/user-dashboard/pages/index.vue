<template>
  <BaseArticles />
</template>

<script>
import BaseArticles from "@/components/article/BaseArticles";
import initialPrivateSocketIO from "@/config/socket.io/private-client";
import { get } from "lodash";
import { mapActions, mapGetters } from "vuex";
import { SOCKETIO_EMIT_EVENT } from "~/constants";

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
    const user_id = this.me?._id;

    if (!user_id) {
      return;
    }

    const socket = initialPrivateSocketIO();
    socket.emit(SOCKETIO_EMIT_EVENT.ONLINE, { user_id });
  },
};
</script>
