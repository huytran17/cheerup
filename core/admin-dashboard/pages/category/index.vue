<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-3 text-center cyan--text">
          <span class="app-title" v-html="$t('Categories Data')"></span>
        </div>

        <div class="d-flex justify-center">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                icon
                @click="$router.push(localePath('/category/new'))"
              >
                <v-icon>mdi-view-grid-plus-outline</v-icon>
              </v-btn>
            </template>
            <span v-html="$t('Create a new category')"></span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCategoryTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseCategoryTable from "@/components/category/widget/BaseCategoryTable";
export default {
  name: "CategoryIndex",
  components: { BaseCategoryTable },
};
</script>
