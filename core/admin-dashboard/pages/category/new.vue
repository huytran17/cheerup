<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Create New Category')"></span>
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
import BaseCreateCategory from "@/components/category/widget/BaseCreateCategory";
export default {
  name: "CreateNewCategoryIndex",
  components: {
    BaseCreateCategory,
  },
};
</script>
