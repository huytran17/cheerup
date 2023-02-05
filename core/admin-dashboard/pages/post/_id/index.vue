<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update Post')"></span>
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
};
</script>
