<template>
  <BaseOverallCard :data="subscription_data" />
</template>

<script>
import { get } from "lodash";
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
      const total_created_counts = get(
        this.subscription_analys_data,
        "total_created_counts",
        []
      );

      return {
        total: get(this.subscription_analys_data, "total_count", 0),
        average: financialAverage(total_created_counts),
        text: "Subscriptions",
        icon: "mdi-email-heart-outline",
      };
    },
  },
};
</script>
