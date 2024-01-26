<template>
  <v-overlay :value="is_app_loading">
    <v-progress-circular
      indeterminate
      :size="is_mobile ? 32 : 64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
import systemMixins from "@/mixins/system";

export default {
  name: "BaseAppLoading",
  mixins: [systemMixins],
  computed: {
    ...mapGetters({
      is_app_loading: "is_app_loading",
    }),
  },
};
</script>
