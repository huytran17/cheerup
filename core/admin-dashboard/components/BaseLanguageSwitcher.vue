<template>
  <div class="text-center">
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-bind="attrs"
          v-on="on"
          :src="locale_data.icon"
          :alt="locale_data.locale"
          :width="25"
          class="mx-auto clickable"
          contain
        ></v-img>
      </template>

      <v-list dense :elevation="0">
        <v-list-item
          v-for="lang in languages"
          :key="lang.code"
          class="clickable"
          @click="changeLocale(lang)"
          :to="switchLocalePath(lang.code)"
        >
          <div class="d-flex">
            <v-img
              :src="lang.icon"
              :lazy-src="lang.icon"
              :alt="lang.locale"
              contain
              :width="20"
            ></v-img>
            <div class="ml-2 text-body-2">
              <span class="app-body" v-html="$t(lang.text)"></span>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "BaseLanguageSwitcher",
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
      locale_data: this.findLocale(this.$i18n.getLocaleCookie()),
    };
  },

  watch: {
    "$i18n.locale": {
      handler(locale) {
        this.locale_data = this.findLocale(locale);
      },
    },
  },
  methods: {
    async changeLocale(lang) {
      await Promise.all([
        this.switchLocalePath(lang.code),
        this.$i18n.setLocale(lang.code),
      ]);
    },

    findLocale(code) {
      return (
        this.languages.find((lang) => lang.code === code) || this.languages[0]
      );
    },
  },
};
</script>
