<template>
  <div>
    <div class="d-flex justify-center">
      <div class="blue lighten-4 w-fit-content pa-1 rounded-lg">
        <v-icon color="green darken-1">mdi-book-open-outline</v-icon>
      </div>
    </div>
    <div class="text-body-1 py-3 primary--text">
      <span class="app-title" v-html="$t('Total Post')"></span>
    </div>
    <span class="text-h6">{{ total_post }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDashboardBanner from "@/components/dashboard/BaseDashboardBanner";
export default {
  name: "BaseOverallPost",
  components: {
    BaseDashboardBanner,
  },
  computed: {
    ...mapGetters({
      post_analys_data: "post/post_analys_data",
    }),

    total_post() {
      return _.get(this.post_analys_data, "total_count", 0);
    },
  },
};
</script>

<style></style>
