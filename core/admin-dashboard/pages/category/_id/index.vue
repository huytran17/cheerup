<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Update Category')"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseUpdateCategory />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseUpdateCategory from "@/components/category/widget/BaseUpdateCategory";
export default {
  name: "CreateNewCategoryIndex",
  components: {
    BaseUpdateCategory,
  },
  head() {
    return {
      title: this.$t("Update category"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
