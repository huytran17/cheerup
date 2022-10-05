import Vue from "vue";

Vue.directive("private", {
  inserted: (el, binding, vnode) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const has_user = vnode.context?.$store.getters("auth/has_user");
      if (has_user) {
        return;
      }

      vnode.context?.$store.commit("SET_IS_OPEN_LOGIN_REQUIRING_SNACKBAR", {
        data: true,
      });
    });
  },
});
