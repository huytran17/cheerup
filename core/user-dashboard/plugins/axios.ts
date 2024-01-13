import { Context, Plugin } from "@nuxt/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { get } from "lodash";
import { HTTP_STATUS_CODE } from "../constants";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}

const plugin: Plugin = ({ $axios }: Context, inject) => {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
  });

  $axios.onResponse((response) => {
    console.log(
      `Got response with status code ${response.status} from ${response.config.url}`
    );
  });

  $axios.onError((error) => {
    const code = get(error, "response.status", HTTP_STATUS_CODE.NOT_FOUND);
    if (code === HTTP_STATUS_CODE.BAD_REQUEST) {
      return;
    }

    const expired = get(error, "response.status", HTTP_STATUS_CODE.NOT_FOUND);
    if (expired === HTTP_STATUS_CODE.UNAUTHORIZED) {
      return;
    }

    console.error(error);
    if (process.env.NODE_ENV === "production") {
      return;
    }
    const default_error = get(error, "response.data.errors", error);
    const final_error = get(error, "response.data.error", default_error);
    console.log("final_error", final_error);
    let error_string = final_error;

    typeof final_error === "object" &&
      (error_string = JSON.stringify(final_error));

    throw error_string;
  });

  inject("axios", $axios);
};

export default plugin;
