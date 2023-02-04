<template>
  <BaseOverallCard :data="subscription_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
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
      return {
        total: _.get(this.subscription_analys_data, "total_count", 0),
        text: "Subscriptions",
        icon: "mdi-book-open-outline",
      };
    },
  },
};
</script>

<style></style>
