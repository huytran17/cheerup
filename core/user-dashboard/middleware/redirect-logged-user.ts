import { Context } from "@nuxt/types";

export default async function ({ store, redirect }: Context) {
  try {
    const access_token = localStorage.getItem("access_token");

    const verified_access_token = await store.dispatch("auth/VERIFY_ACCESS", {
      access_token,
    });

    if (verified_access_token) {
      return redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
}
