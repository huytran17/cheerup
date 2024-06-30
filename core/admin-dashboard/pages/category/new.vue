<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Create New Category") }}</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCreateCategory />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseCreateCategory from "@/components/category/widget/BaseCreateCategory";
export default {
  name: "CreateNewCategoryIndex",
  components: {
    BaseCreateCategory,
  },
  head() {
    return {
      title: this.$t("Create new category"),
    };
  },
  data() {
    return {
      ADMIN_TYPES,
    };
  },
};
</script>
