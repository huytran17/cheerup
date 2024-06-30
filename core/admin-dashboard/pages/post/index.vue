<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6 pb-10 brick--text">
          <h2 class="app-title">{{ $t("Posts Data") }}</h2>
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
                @click="$router.push(localePath('/post/new'))"
              >
                <v-icon small>mdi-plus</v-icon>
                <span class="app-body">{{ $t("Add") }}</span>
              </v-btn>
            </template>
            <span class="app-body">{{ $t("Create a new post") }}</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BasePostTable :search="search" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BasePostTable from "@/components/post/widget/BasePostTable";
export default {
  name: "PostIndex",
  components: { BasePostTable },
  head() {
    return {
      title: this.$t("Posts"),
    };
  },
  data() {
    return {
      search: "",
    };
  },
};
</script>
