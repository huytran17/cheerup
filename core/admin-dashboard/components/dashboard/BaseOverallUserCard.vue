<template>
  <BaseOverallCard :data="user_data" />
</template>

<script>
import { get } from "lodash";

import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
import { financialAverage } from "@/utils";

export default {
  name: "BaseOverallUser",
  components: {
    BaseOverallCard,
  },
  computed: {
    ...mapGetters({
      user_analys_data: "user/user_analys_data",
    }),

    user_data() {
      const total_created_counts = get(
        this.user_analys_data,
        "total_created_counts",
        []
      );

      return {
        total: get(this.user_analys_data, "total_count", 0),
        average: financialAverage(total_created_counts),
        text: "Users",
        icon: "mdi-account-supervisor-circle",
      };
    },
  },
};
</script>
