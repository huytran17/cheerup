import { Context, Plugin } from "@nuxt/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import _ from "lodash";
import { HTTP_STATUS_CODE } from "../constants";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}

const plugin: Plugin = ({ $axios, redirect }: Context, inject) => {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    config.headers.common["token-type"] = "bearer";
  });

  $axios.onResponse((response) => {
    console.log(
      `Got response with status code ${response.status} from ${response.config.url}`
    );
  });

  $axios.onError((error) => {
    const code = _.get(error, "response.status", HTTP_STATUS_CODE.NOT_FOUND);
    if (code === HTTP_STATUS_CODE.BAD_REQUEST) {
      return redirect("/400");
    }

    const expired = _.get(error, "response.status", HTTP_STATUS_CODE.NOT_FOUND);
    if (expired === HTTP_STATUS_CODE.UNAUTHORIZED) {
      return;
    }

    console.error(error);
    if (process.env.NODE_ENV === "production") {
      return;
    }
    const default_error = _.get(error, "response.data.errors", error);
    const final_error = _.get(error, "response.data.error", default_error);
    console.log("final_error", final_error);
    let error_string = final_error;

    typeof final_error === "object" &&
      (error_string = JSON.stringify(final_error));

    throw error_string;
  });

  inject("axios", $axios);
};

export default plugin;
