<template>
  <BaseOverallCard :data="admin_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
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
      return {
        total: _.get(this.admin_analys_data, "total_count", 0),
        text: "Admins",
        icon: "mdi-account-heart-outline",
      };
    },
  },
};
</script>

<style></style>
