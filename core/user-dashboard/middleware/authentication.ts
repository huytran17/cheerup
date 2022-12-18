import { Context } from "@nuxt/types";
import { isNil } from "lodash";

export default async function ({ store }: Context) {
  try {
    const access_token = localStorage.getItem("access_token");

    const verified_access_token = await store.dispatch("auth/VERIFY_ACCESS", {
      access_token,
    });

    if (verified_access_token) {
      return await store.dispatch("auth/GET_ME");
    }
  } catch (error) {
    console.error(error);
  }
}
