import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const { email } = await store.dispatch("auth/VERIFY_ACCESS");

    if (email) {
      return await store.dispatch("auth/GET_ME");
    }

    redirect(app.localePath("/login"));
  } catch (error) {
    console.error(error);
  }
}
