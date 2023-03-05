<template>
  <v-row class="soft-box-shadow rounded-lg mt-8 px-4 py-5">
    <v-col cols="12" class="py-0">
      <div class="text-body-1 primary--text">
        <span class="app-title" v-html="$t('System Configurations')"></span>
      </div>
    </v-col>

    <v-col cols="12" class="pt-6">
      <v-checkbox
        :input-value="system_configuration.is_blocked_comment"
        :label="$t('Block comment for all posts')"
        hide-details
        class="mt-0"
        :true-value="true"
        :false-value="false"
        @change="
          updateSystemConfigurationObject({
            variable_path: 'is_blocked_comment',
            data: $event,
          })
        "
      ></v-checkbox>
    </v-col>

    <v-col cols="12" class="pt-0">
      <v-checkbox
        :input-value="system_configuration.is_maintaining"
        :label="$t('Switch to maintaining mode')"
        hide-details
        class="mt-0"
        :true-value="true"
        :false-value="false"
        @change="
          updateSystemConfigurationObject({
            variable_path: 'is_maintaining',
            data: $event,
          })
        "
      ></v-checkbox>
    </v-col>

    <v-col cols="12" sm="6" class="pt-0">
      <v-combobox
        :items="languages"
        :label="$t('Language')"
        :value="locale_data"
        @change="changeLocale"
      >
        <template v-slot:selection="{ attrs, item }">
          <div v-bind="attrs" class="d-flex">
            <div class="d-flex flex-column justify-center">
              <v-img
                :src="item.icon"
                :alt="item.code"
                :width="20"
                contain
              ></v-img>
            </div>

            <div class="text-body-2 ml-2">
              <span class="app-body" v-html="item.text"></span>
            </div>
          </div>
        </template>

        <template v-slot:item="{ item }">
          <div class="d-flex">
            <div class="d-flex flex-column justify-center">
              <v-img
                :src="item.icon"
                :alt="item.code"
                :width="20"
                contain
              ></v-img>
            </div>

            <div class="text-body-2 ml-2">
              <span class="app-body" v-html="item.text"></span>
            </div>
          </div>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import systemConfigurationMixins from "@/mixins/system-configuration";

export default {
  name: "BaseUpdateSystemConfigurationData",
  mixins: [systemConfigurationMixins],
  props: {
    languages: {
      type: Array,
      default: () => [
        {
          text: "English",
          code: "en",
          icon: require("@/assets/images/icon/us-flag.png"),
        },
        {
          text: "Vietnamese",
          code: "vi",
          icon: require("@/assets/images/icon/vn-flag.png"),
        },
      ],
    },
  },
  data() {
    return {
      locale_data:
        JSON.parse(localStorage.getItem("locale")) || this.languages[0],
      te: null,
    };
  },
  watch: {
    "$i18n.locale": {
      handler(locale) {
        this.locale_data =
          this.languages.find((lang) => lang.code === locale) ||
          this.languages[0];
      },
    },
  },
  methods: {
    async changeLocale(lang) {
      this.switchLocalePath(lang.code);
      await this.$i18n.setLocale(lang.code);
      localStorage.setItem("locale", JSON.stringify(lang));
    },
  },
};
</script>
