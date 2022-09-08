<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="about__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('About Me')"
      ></span>
    </div>
    <div class="about__information py-6 px-6">
      <div class="d-flex justify-center pb-6">
        <v-img
          :src="owner_avatar_url"
          :lazy-src="owner_avatar_url"
          :alt="owner_name"
          contain
          max-width="150px"
          class="rounded-circle"
        ></v-img>
      </div>
      <div class="small--text">
        <span class="app-body" v-html="$t(owner_description)"></span>
      </div>
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
      return _.get(this.system_configuration_data, "client_owner_avatar_url");
    },

    owner_name() {
      return _.get(this.system_configuration_data, "client_meta.owner.name");
    },

    owner_description() {
      return _.get(
        this.system_configuration_data,
        "client_meta.owner.description"
      );
    },
  },
};
</script>

<style scoped>
.about__information {
  border-top: 1px solid var(--color-article-baseline);
  border-left: 1px solid var(--color-article-baseline);
  border-bottom: 1px solid var(--color-article-baseline);
}
.about__header::before {
  content: "";
  position: absolute;
  top: 9.1px;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid var(--color-tab-border);
}
</style>
