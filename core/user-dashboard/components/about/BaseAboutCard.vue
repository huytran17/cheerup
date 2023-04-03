<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span
        class="sidebar__header position-relative app-body mb-2 d-inline-block"
        v-html="$t('About Me')"
      ></span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div v-if="should_show_avatar" class="d-flex justify-center pb-6">
        <v-img
          v-if="owner_avatar_url"
          :src="owner_avatar_url"
          :lazy-src="owner_avatar_url"
          :alt="owner_name"
          cover
          max-width="110px"
          max-height="110px"
          class="rounded-circle"
        ></v-img>
        <avatar
          v-else-if="owner_name"
          :username="owner_name"
          :name="owner_name"
          :size="60"
        ></avatar>
      </div>
      <div v-if="owner_description" class="position-relative">
        <v-icon color="brick" class="quote__description position-absolute" large
          >mdi-format-quote-open</v-icon
        >
        <div class="small--text text-left" v-line-clamp="5">
          <span class="app-body text--ellipsis me__description">{{
            owner_description
          }}</span>
        </div>
      </div>

      <div class="text-body-3 text-sm-body-2 text-uppercase text-left">
        <div class="py-2 card-item__wrapper">
          <span
            class="app-body clickable card-item__title"
            v-html="$t('More about me')"
            @click="$router.push(localePath('/about'))"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Avatar from "vue-avatar";

export default {
  name: "BaseAboutCard",
  components: { Avatar },
  computed: {
    ...mapGetters({
      system_configuration: "system-configuration/system_configuration",
    }),

    should_show_avatar() {
      return this.owner_avatar_url || this.owner_name;
    },

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
.quote__description {
  top: -15px;
  left: -10px;
}
</style>
