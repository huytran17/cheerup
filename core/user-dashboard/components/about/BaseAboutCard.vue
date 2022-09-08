<template>
  <div class="d-flex flex-column">
    <div class="about__header text-uppercase text-body-1">
      <span class="app-body" v-html="$t('About Me')"></span>
    </div>
    <div class="d-flex flex-column justify-space-between">
      <v-img
        :src="owner_avatar_url"
        :lazy-src="owner_avatar_url"
        :alt="owner_name"
        contain
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAboutCard",
  props: {
    system_configuration_data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    owner_avatar_url() {
      return _.get(this.system_configuration_data, "owner_avatar_url");
    },

    owner_name() {
      return _.get(this.system_configuration_data, "owner_name");
    },
  },
};
</script>

<style></style>
