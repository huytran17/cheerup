<template>
  <div class="app-container">
    <v-row>
      <v-col cols="12">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:item.full_name="{ item }">
            <div
              class="text-body-2 primary--text clickable"
              @click="$router.push(localePath(`/user/${item._id}`))"
            >
              <span class="app-body">{{ item.full_name }}</span>
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
import userMixins from "@/mixins/user";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseUserTable",
  mixins: [userMixins, systemMixins],
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Fullname",
            align: "start",
            value: "full_name",
          },
          {
            text: "Email",
            align: "start",
            value: "email",
          },
          {
            text: "Joined At",
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
      await this.GET_USERS();
    } catch (err) {
      console.error(err);
    } finally {
      this.initial_loading = false;
    }
  },
};
</script>

<style></style>
