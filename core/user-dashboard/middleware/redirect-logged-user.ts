import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const access_token = localStorage.getItem("access_token");

    const { email } = await store.dispatch("auth/VERIFY_ACCESS", {
      access_token,
    });

    if (email) {
      return redirect(app.localePath("/"));
    }
  } catch (error) {
    console.error(error);
  }
}
