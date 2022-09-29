<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('About Me')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div class="d-flex justify-center pb-6">
        <v-img
          v-if="owner_avatar_url"
          :src="owner_avatar_url"
          :lazy-src="owner_avatar_url"
          :alt="owner_name"
          contain
          max-width="150px"
          class="rounded-circle"
        ></v-img>
        <avatar
          v-else
          :username="owner_name"
          :name="owner_name"
          :size="60"
        ></avatar>
      </div>
      <div class="small--text text-left">
        <span class="app-body" v-html="$t(owner_description)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  name: "BaseAboutCard",
  props: {
    system_configuration_data: {
      type: Object,
      required: true,
    },
  },
  components: { Avatar },
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
