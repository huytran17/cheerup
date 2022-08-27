<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Create New Post')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreatePost />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseCreatePost from "@/components/post/widget/BaseCreatePost";
export default {
  name: "CreateNewPostIndex",
  components: {
    BaseCreatePost,
  },
};
</script>

<style></style>
