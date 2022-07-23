import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      me: "auth/me",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      SIGN_IN: "auth/SIGN_IN",
      SIGN_UP: "auth/SIGN_UP",
      SIGN_OUT: "auth/SIGN_OUT",
    }),
    ...mapMutations({
      SET_USER: "auth/SET_USER",
    }),
  },
};
