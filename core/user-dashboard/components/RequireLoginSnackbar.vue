<template>
  <v-snackbar v-model="is_open_snackbar">
    <div class="text-body-2">
      <span
        class="app-body"
        v-html="$t('You need to be logged in to perform this action')"
      ></span>
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn
        color="primary"
        text
        v-bind="attrs"
        @click="SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR({ data: false })"
      >
        <div class="text-body-2">
          <span class="app-body" v-html="$t('Close')"></span>
        </div>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RequireLoginSnackbar",
  data() {
    return {
      is_open_snackbar: false,
    };
  },
  computed: {
    ...mapGetters({
      is_open_login_requiring_snackbar: "is_open_login_requiring_snackbar",
    }),
  },
  watch: {
    is_open_snackbar(value) {
      this.SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR({ data: value });
    },

    is_open_login_requiring_snackbar(value) {
      this.is_open_snackbar = value;
    },
  },
  methods: {
    ...mapMutations({
      SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR:
        "SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR",
    }),
  },
};
</script>
