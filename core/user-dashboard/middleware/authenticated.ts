import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const { _id } = await store.dispatch("auth/VERIFY_ACCESS");

    if (_id) {
      return await store.dispatch("auth/GET_ME");
    }

    redirect(app.localePath("/login"));
  } catch (error) {
    console.error(error);
  }
}
