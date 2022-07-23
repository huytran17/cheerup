import { Context, Plugin } from "@nuxt/types";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import _ from "lodash";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}

const plugin: Plugin = ({ $axios, redirect, store }: Context, inject) => {
  $axios.onRequest((config) => {
    console.log("Making request to " + config.url);
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    config.headers.common["token-type"] = "bearer";
    // config.headers.common['client'] = store.state.user.headers.client;
    // config.headers.common['expiry'] = store.state.user.headers.expiry;
    // config.headers.common['uid'] = store.state.user.headers.uid;
  });

  $axios.onError((error) => {
    const code = _.get(error, "response.status", 404);
    if (code === 400) {
      // return redirect("/400");
      return;
    }

    const expired = _.get(error, "response.status", 404);
    if (expired === 401) {
      const origin = `${window.location.origin}/signin?message=${error.response?.data}`;
      window.location.replace(origin);
      return;
    }

    console.log(error);
    if (process.env.NODE_ENV === "production") {
      return;
    }
    const default_error = _.get(error, "response.data.errors", error);
    const final_error = _.get(error, "response.data.error", default_error);
    console.log("final_error", final_error);
    let error_string = final_error;
    if (typeof final_error === "object") {
      error_string = JSON.stringify(final_error);
    }
    throw error_string;
  });
  inject("axios", $axios);
};

export default plugin;
