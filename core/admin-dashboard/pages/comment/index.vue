<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Comments Data") }}</h2>
        </div>

        <div class="toolbar">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="table-search-input"
            color="brick"
            hide-details
            outlined
            single-line
            dense
            clearable
            :label="$t('Search')"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCommentTable :search="search" />
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
      search: "",
      ADMIN_TYPES,
    };
  },
};
</script>
