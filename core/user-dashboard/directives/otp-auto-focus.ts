import Vue from "vue";

Vue.directive("otp-auto-focus", {
  inserted: (el, binding, vNode) => {
    const input = <HTMLElement>el.querySelector(".otp-input");
    input.focus();
  },
});
