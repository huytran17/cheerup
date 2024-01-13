import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const { _id } = await store.dispatch("auth/GET_ME");

    !_id && redirect(app.localePath("/login"));

    redirect(app.localePath("/login"));
  } catch (error) {
    console.error(error);
  }
}
