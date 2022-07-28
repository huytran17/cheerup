import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  hideProgressBar: true,
  timeout: 3000,
};

Vue.use(Toast, options);
