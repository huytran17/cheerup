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
        <v-data-table
          :headers="headers"
          :items="subscriptions"
          :search="search"
        >
          <template v-slot:item.is_active="{ item }">
            <div v-if="item.is_active" class="text-body-2">
              <v-chip color="green" text-color="white">
                <span v-html="$t('Active')"></span>
              </v-chip>
            </div>
            <div v-else class="text-body-2">
              <v-chip color="red" text-color="white">
                <span v-html="$t('Non Active')"></span>
              </v-chip>
            </div>
          </template>

          <template v-slot:item.created_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatLocaleDate(item.created_at)
              }}</span>
            </div>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <div class="text-body-2">
              <span class="app-body">{{
                formatLocaleDate(item.updated_at)
              }}</span>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import subscriptionMixins from "@/mixins/subscription";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseSubscriptionTable",
  mixins: [subscriptionMixins, systemMixins],
  props: {
    headers: {
      type: Array,
      default() {
        return [
          {
            text: "Email",
            align: "start",
            value: "email",
          },
          {
            text: "Is Active",
            align: "start",
            value: "is_active",
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
    };
  },

  async fetch() {
    try {
      await this.GET_SUBSCRIPTIONS();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
