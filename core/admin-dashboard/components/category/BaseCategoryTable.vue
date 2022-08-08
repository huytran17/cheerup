<template>
  <div class="app-container">
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="text-h6">
          <span class="app-title" v-html="$t('Users')"></span>
        </div>
      </v-col>

      <v-col cols="12" class="pb-0">
        <div class="d-flex">
          <v-btn
            depressed
            color="primary"
            tile
            @click="$router.push(localePath('/user/new'))"
          >
            <span v-html="$t('Add New User')"></span>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="categories" :search="search">
          <template v-slot:item.title="{ item }">
            <div
              class="text-body-2 primary--text clickable"
              @click="$router.push(localePath(`/category/${item._id}`))"
            >
              <span class="app-body">{{ item.title }}</span>
            </div>
          </template>

          <template v-slot:item.children="{ item }">
            <div class="text-body-2">
              <BaseCategoryChildrenItem
                v-for="(category, index) in item.children"
                :key="index"
                :category="category"
              />
            </div>
          </template>

          <template v-slot:item.created_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatDate(item.created_at, "DD-MM-YYYY HH:mm")
              }}</span>
            </div>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatDate(item.updated_at, "DD-MM-YYYY HH:mm")
              }}</span>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import categoryMixins from "@/mixins/category";
import systemMixins from "@/mixins/system";

import BaseCategoryChildrenItem from "@/components/category/BaseCategoryChildrenItem";

export default {
  name: "BaseCategoryTable",
  mixins: [categoryMixins, systemMixins],
  components: { BaseCategoryChildrenItem },
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Title",
            align: "start",
            value: "title",
          },
          {
            text: "Children",
            align: "start",
            value: "children",
          },
          {
            text: "Created At",
            align: "start",
            value: "created_at",
          },
          {
            text: "Last Updated At",
            align: "start",
            value: "updated_at",
          },
        ];
      },
    },
  },
  data() {
    return {
      search: "",
      initial_loading: true,
    };
  },

  async fetch() {
    try {
      this.initial_loading = true;
      await this.GET_CATEGORIES();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>
