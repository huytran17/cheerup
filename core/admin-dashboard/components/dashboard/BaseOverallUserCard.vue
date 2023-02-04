<template>
  <BaseOverallCard :data="user_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
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
      return {
        total: _.get(this.user_analys_data, "total_count", 0),
        text: "Users",
        icon: "mdi-account-supervisor-circle",
      };
    },
  },
};
</script>

<style></style>
