<template>
  <BaseOverallCard :data="post_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
import { financialAverage } from "@/utils";

export default {
  name: "BaseOverallPost",
  components: {
    BaseOverallCard,
  },
  computed: {
    ...mapGetters({
      post_analys_data: "post/post_analys_data",
    }),

    post_data() {
      const total_created_counts = _.get(
        this.post_analys_data,
        "total_created_counts",
        []
      );

      return {
        total: _.get(this.post_analys_data, "total_count", 0),
        average: financialAverage(total_created_counts),
        text: "Posts",
        icon: "mdi-book-open-outline",
      };
    },
  },
};
</script>
