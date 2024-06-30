<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Update Post") }}</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdatePost />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseUpdatePost from "@/components/post/widget/BaseUpdatePost";
export default {
  name: "CreateNewPostIndex",
  components: {
    BaseUpdatePost,
  },
  head() {
    return {
      title: this.$t("Update post"),
    };
  },
};
</script>
