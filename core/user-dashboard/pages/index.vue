<template>
  <div>
    <v-row>
      <v-col cols="12" sm="9">
        <BaseBasicArticle />
      </v-col>
      <v-col cols="12" sm="3"></v-col>
    </v-row>
  </div>
</template>

<script>
import BaseBasicArticle from "@/components/article/BaseBasicArticle";
export default {
  name: "IndexPage",
  components: {
    BaseBasicArticle,
  },
};
</script>
