<template>
  <div class="d-flex flex-column">
    <BaseAnalysisToggler @refresh="$fetch" />
    <BaseDashboardAnalysis />
  </div>
</template>

<script>
import BaseAnalysisToggler from "@/components/dashboard/BaseAnalysisToggler";
import BaseDashboardAnalysis from "@/components/dashboard/BaseDashboardAnalysis";
import initialPrivateSocketIO from "@/config/socket.io/private-admin";
import { mapActions, mapGetters } from "vuex";
import { SOCKETIO_EMIT_EVENT } from "~/constants";

export default {
  name: "AdminDashboard",
  components: {
    BaseDashboardAnalysis,
    BaseAnalysisToggler,
  },

  computed: {
    ...mapGetters({
      analysis: "analysis",
      me: "auth/me",
    }),
  },

  methods: {
    ...mapActions({
      GET_USER_ANALYTICS: "user/GET_USER_ANALYTICS",
      GET_ADMIN_ANALYTICS: "admin/GET_ADMIN_ANALYTICS",
      GET_POST_ANALYTICS: "post/GET_POST_ANALYTICS",
      GET_MOST_POPULAR_POSTS_ANALYTICS: "post/GET_MOST_POPULAR_POSTS_ANALYTICS",
      GET_SUBSCRIPTION_ANALYTICS: "subscription/GET_SUBSCRIPTION_ANALYTICS",
      GET_CATEGORY_ANALYTICS: "category/GET_CATEGORY_ANALYTICS",
    }),
  },

  async fetch() {
    try {
      await Promise.all([
        this.GET_USER_ANALYTICS({ ...this.analysis }),
        this.GET_ADMIN_ANALYTICS({ ...this.analysis }),
        this.GET_POST_ANALYTICS({ ...this.analysis }),
        this.GET_SUBSCRIPTION_ANALYTICS({ ...this.analysis }),
        this.GET_MOST_POPULAR_POSTS_ANALYTICS({ ...this.analysis }),
        this.GET_CATEGORY_ANALYTICS({ ...this.analysis }),
      ]);

      const user_id = this.me?._id;

      if (!user_id) {
        return;
      }

      const socket = initialPrivateSocketIO();
      socket.emit(SOCKETIO_EMIT_EVENT.ONLINE, { user_id });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
