<template>
  <BaseOverallCard :data="subscription_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
import { financialAverage } from "@/utils";

export default {
  name: "BaseOverallSubscription",
  components: {
    BaseOverallCard,
  },
  computed: {
    ...mapGetters({
      subscription_analys_data: "subscription/subscription_analys_data",
    }),

    subscription_data() {
      const total_created_counts = _.get(
        this.subscription_analys_data,
        "total_created_counts",
        []
      );

      return {
        total: _.get(this.subscription_analys_data, "total_count", 0),
        average: financialAverage(total_created_counts),
        text: "Subscriptions",
        icon: "mdi-book-open-outline",
      };
    },
  },
};
</script>

<style></style>
