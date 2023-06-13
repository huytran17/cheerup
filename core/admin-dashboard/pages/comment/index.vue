<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Comments Data')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCommentTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseCommentTable from "@/components/comment/widget/BaseCommentTable";
export default {
  name: "CommentIndex",
  components: { BaseCommentTable },
  head() {
    return {
      title: this.$t("Comments"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
