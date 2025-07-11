import Vue from "vue";

Vue.directive("private", {
  inserted: (el, binding, vNode) => {
    el.addEventListener("click", (event) => {
      const has_user = vNode.context?.$store.getters["auth/has_user"];

      if (!has_user) {
        event.preventDefault();
        vNode.context?.$toast.error(binding.value);
      }
    });
  },
});
