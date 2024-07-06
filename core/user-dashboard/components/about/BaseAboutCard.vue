<template>
  <div class="d-flex flex-column text-center">
    <div class="text-uppercase text-body-2">
      <span class="sidebar__header position-relative mb-2 d-inline-block">{{
        $t("About Me")
      }}</span>
    </div>
    <div class="sidebar__card py-6 px-6">
      <div v-if="should_show_avatar" class="d-flex justify-center">
        <v-img
          v-if="owner_avatar_url"
          :src="owner_avatar_url"
          :lazy-src="owner_avatar_url"
          :alt="owner_name"
          cover
          class="rounded-circle"
        ></v-img>
        <avatar
          v-else-if="owner_name"
          :username="owner_name"
          :name="owner_name"
          :size="60"
        ></avatar>
      </div>

      <div v-if="owner_name" class="position-relative py-4">
        <div class="small--text text-center">
          <span class="text--ellipsis me__description">{{ owner_name }}</span>
        </div>
      </div>

      <div v-if="owner_description" class="position-relative pb-2">
        <v-icon color="brick" class="quote__description position-absolute" large
          >mdi-format-quote-open</v-icon
        >
        <div class="small--text text-left" v-line-clamp="5">
          <span
            class="text--ellipsis me__description"
            v-html="owner_description"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "lodash";
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
      return get(this.system_configuration, "owner_avatar_url");
    },

    owner_name() {
      return get(this.system_configuration, "owner.name");
    },

    owner_description() {
      return get(this.system_configuration, "owner.description");
    },
  },
};
</script>

<style lang="scss" scoped>
.quote__description {
  top: toRem(-15);
  left: toRem(-10);
}

.sidebar__card {
  .v-image {
    max-width: toRem(90);
    max-height: toRem(90);
    aspect-ratio: 1;
  }
}
</style>
