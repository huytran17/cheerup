<template>
  <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
    <v-col cols="12" class="pb-0">
      <div class="text-body-1 text-sm-h6">
        <span class="app-title" v-html="$t('Features')"></span>
      </div>
    </v-col>
    <v-col cols="12">
      <v-switch
        :value="me.is_subscribed"
        :label="$t('Get notified when there is a new post')"
        color="primary"
        :false-value="false"
        :true-value="true"
        hide-details
        @change="toggleSubscription({ data: $event })"
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
import authMixins from "@/mixins/auth";
import subscriptionMixins from "@/mixins/subscription";

export default {
  name: "BaseAccountFeatures",
  mixins: [authMixins, subscriptionMixins],
  methods: {
    async toggleSubscription({ data }) {
      try {
        const is_subscribing = !!data;

        if (is_subscribing) {
          await this.CREATE_SUBSCRIPTION({
            data: { is_active: true },
          });
          return;
        }

        return await this.CANCEL_SUBSCRIPTION();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
