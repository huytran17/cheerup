<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text text-uppercase">
          <h3 class="app-title">{{ $t("Create New Post") }}</h3>
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
  name: "CreateNewPostPage",
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
