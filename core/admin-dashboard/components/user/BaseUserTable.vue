<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
  ></v-data-table>
</template>

<script>
import userMixins from "@/mixins/user";
export default {
  name: "BaseUserTable",
  mixins: [userMixins],
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Fullname",
            align: "start",
            value: "fullname",
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
