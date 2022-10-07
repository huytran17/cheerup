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
        color="pink"
        text
        v-bind="attrs"
        @click="SET_OPEN_LOGIN_SNACKBAR({ data: false })"
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
      this.SET_OPEN_LOGIN_SNACKBAR({ data: value });
    },
  },
  methods: {
    ...mapMutations({
      SET_OPEN_LOGIN_SNACKBAR: "SET_OPEN_LOGIN_SNACKBAR",
    }),
  },
  created() {
    console.log("---------ok");
    this.is_open_snackbar = this.is_open_login_requiring_snackbar;
  },
};
</script>

<style></style>
