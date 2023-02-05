<template>
  <BaseOverallCard :data="admin_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
import { financialAverage } from "@/utils";

export default {
  name: "BaseOverallAdmin",
  components: {
    BaseOverallCard,
  },
  computed: {
    ...mapGetters({
      admin_analys_data: "admin/admin_analys_data",
    }),

    admin_data() {
      const total_created_counts = _.get(
        this.admin_analys_data,
        "total_created_counts",
        []
      );

      return {
        total: _.get(this.admin_analys_data, "total_count", 0),
        average: financialAverage(total_created_counts),
        text: "Admins",
        icon: "mdi-account-heart-outline",
      };
    },
  },
};
</script>
