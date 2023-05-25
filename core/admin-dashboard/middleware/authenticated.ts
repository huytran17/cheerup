import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const access_token = localStorage.getItem("admin_access_token");

    const { email } = await store.dispatch("auth/VERIFY_ACCESS", {
      access_token,
    });

    if (email) {
      return await store.dispatch("auth/GET_ME");
    }

    redirect(app.localePath("/login"));
  } catch (error) {
    console.error(error);
  }
}
