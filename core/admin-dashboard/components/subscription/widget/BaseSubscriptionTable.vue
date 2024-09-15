<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="subscriptions"
        :search="search"
        :page="subscription_pagination.current_page"
        :items-per-page="subscription_pagination.per_page"
        :multi-sort="true"
        :server-items-length="subscription_pagination.total"
        @update:items-per-page="tableUpdateItemsPerPage"
        @update:page="tableUpdatePage"
      >
        <template v-slot:item.is_active="{ item }">
          <div v-if="item.is_active" class="text-body-2">
            <v-chip color="green" text-color="white">
              {{ $t("Active") }}
            </v-chip>
          </div>
          <div v-else class="text-body-2">
            <v-chip color="red" text-color="white">
              {{ $t("Non Active") }}
            </v-chip>
          </div>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div class="text-body-2">
            {{ formatLocaleDate(item.created_at) }}
          </div>
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div class="text-body-2">
            {{ formatLocaleDate(item.updated_at) }}
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
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
    search: {
      type: String,
      default: () => "",
    },
  },

  methods: {
    async tableUpdatePage(data) {
      try {
        await this.GET_POSTS_PAGINATED({
          page: data,
          entries_per_page: this.subscription_pagination.per_page,
        });
      } catch (error) {
        console.error(error);
      }
    },

    async tableUpdateItemsPerPage(data) {
      try {
        await this.GET_POSTS_PAGINATED({
          page: 1,
          entries_per_page: data,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  async fetch() {
    try {
      await this.GET_SUBSCRIPTIONS_PAGINATED({
        page: this.subscription_pagination.current_page,
        entries_per_page: this.subscription_pagination.per_page,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
