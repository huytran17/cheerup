<template>
  <v-row class="soft-box-shadow rounded-lg px-4 py-5 w-100 mx-auto">
    <v-col cols="12" class="pb-0">
      <div class="text-body-1 text-sm-h6">
        <span class="app-title" v-html="$t('Features')"></span>
      </div>
    </v-col>
    <v-col cols="12">
      <v-switch
        :input-value="me.is_subscribed"
        :label="$t('Get notified when there is a new post')"
        color="brick"
        hide-details
        dense
        @change="toggleSubscription({ data: $event })"
      ></v-switch>
    </v-col>
    <v-col cols="12">
      <v-switch
        v-model="tfa_switcher"
        :label="$t('Enable 2FA (Two-factor authentication)')"
        color="brick"
        :false-value="false"
        :true-value="true"
        hide-details
        dense
      ></v-switch>
    </v-col>

    <Enable2FADialog v-if="should_open_enable_2fa_dialog" />
    <Disable2FADialog v-if="should_open_disable_2fa_dialog" />
    <QRCodeDialog />
  </v-row>
</template>

<script>
import { get } from "lodash";
import authMixins from "@/mixins/auth";
import subscriptionMixins from "@/mixins/subscription";
import Enable2FADialog from "@/components/2fa/Enable2FADialog";
import Disable2FADialog from "@/components/2fa/Disable2FADialog";
import QRCodeDialog from "@/components/2fa/QRCodeDialog";

export default {
  name: "BaseAccountFeatures",
  mixins: [authMixins, subscriptionMixins],
  components: { Enable2FADialog, Disable2FADialog, QRCodeDialog },
  data() {
    return {
      tfa_switcher: false,
    };
  },
  computed: {
    should_open_enable_2fa_dialog() {
      return this.tfa_switcher && !this.is_enabled_2fa;
    },

    should_open_disable_2fa_dialog() {
      return !this.tfa_switcher && this.is_enabled_2fa;
    },

    is_enabled_2fa() {
      return get(this.me, "is_enabled_2fa", false);
    },
  },
  watch: {
    should_open_enable_2fa_dialog: {
      handler(value) {
        value && this.SET_IS_OPEN_2FA_MODAL({ data: true });
      },
    },
    should_open_disable_2fa_dialog: {
      handler(value) {
        value && this.SET_IS_OPEN_2FA_MODAL({ data: true });
      },
    },
  },
  methods: {
    async toggleSubscription({ data }) {
      try {
        const is_subscribed = !!data;

        if (is_subscribed) {
          await this.CREATE_SUBSCRIPTION({
            data: { is_active: true },
          });
        } else {
          await this.CANCEL_SUBSCRIPTION();
        }

        await this.GET_ME();
      } catch (error) {
        console.error(error);
      }
    },
  },
  fetch() {
    this.tfa_switcher = this.is_enabled_2fa;
  },
};
</script>

<style scoped>
.v-input--switch {
  margin-top: 0 !important;
}
</style>
