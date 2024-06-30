<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Create New Post") }}</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreatePost />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseCreatePost from "@/components/post/widget/BaseCreatePost";
export default {
  name: "CreateNewPostIndex",
  components: {
    BaseCreatePost,
  },
  head() {
    return {
      title: this.$t("Create new post"),
    };
  },
};
</script>
