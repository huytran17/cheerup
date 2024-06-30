<template>
  <div v-page-roles="[ADMIN_TYPES.OWNER, ADMIN_TYPES.COLLABORATOR]">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Categories Data") }}</h2>
        </div>

        <div class="table-toolbar">
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
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="brick"
                height="auto"
                class="px-2"
                outlined
                tile
                @click="$router.push(localePath('/category/new'))"
              >
                <v-icon small>mdi-plus</v-icon>
                <span class="app-body">{{ $t("Add") }}</span>
              </v-btn>
            </template>
            <span class="app-body">{{ $t("Create a new category") }}</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseCategoryTable :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ADMIN_TYPES } from "@/constants";
import BaseCategoryTable from "@/components/category/widget/BaseCategoryTable";
export default {
  name: "CategoryIndex",
  components: { BaseCategoryTable },
  head() {
    return {
      title: this.$t("Categories"),
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
