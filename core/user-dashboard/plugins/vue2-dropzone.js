import Vue from "vue";
import Vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

const options = {
  thumbnailWidth: 150,
  maxFilesize: 5,
};

Vue.component("v-dropzone", Vue2Dropzone, options);
