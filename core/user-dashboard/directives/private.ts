import Vue from "vue";

Vue.directive("private", {
  inserted: (el, binding, vNode) => {
    el.addEventListener("click", (event) => {
      const has_user = vNode.context?.$store.getters["auth/has_user"];

      if (!has_user) {
        event.preventDefault();
        vNode.context?.$store.commit("SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR", {
          data: true,
        });
      }
    });
  },
});
