<template>
  <BaseOverallCard :data="post_data" />
</template>

<script>
import { mapGetters } from "vuex";
import BaseOverallCard from "@/components/dashboard/BaseOverallCard";
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
      return {
        total: _.get(this.post_analys_data, "total_count", 0),
        text: "Posts",
        icon: "mdi-book-open-outline",
      };
    },
  },
};
</script>

<style></style>
