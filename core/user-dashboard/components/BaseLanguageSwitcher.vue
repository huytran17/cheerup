<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-bind="attrs"
          v-on="on"
          :src="locale_data.icon"
          :alt="locale_data.locale"
          :width="25"
          :min-height="16"
          class="mx-auto clickable"
          contain
        ></v-img>
      </template>

      <v-list dense :elevation="0">
        <v-list-item-group :value="selected_item" color="primary">
          <v-list-item
            v-for="lang in languages"
            :key="lang.code"
            class="clickable"
            @click="changeLocale(lang)"
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
        </v-list-item-group>
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
          icon: require("@/assets/images/icon/us-flag.webp"),
        },
        {
          text: "Vietnamese",
          code: "vi",
          icon: require("@/assets/images/icon/vn-flag.webp"),
        },
      ],
    },
  },

  computed: {
    locale_data() {
      return (
        this.languages.find((lang) => lang.code === this.locale) ||
        this.languages[0]
      );
    },

    locale() {
      return this.$i18n.locale;
    },

    selected_item() {
      return this.languages.findIndex((lang) => lang.code === this.locale);
    },
  },

  methods: {
    async changeLocale(lang) {
      await Promise.all([
        this.switchLocalePath(lang.code),
        this.$i18n.setLocale(lang.code),
      ]);
    },
  },
};
</script>

<style scoped>
.v-list {
  padding: 0;
}
.v-menu__content {
  box-shadow: none;
}
</style>
