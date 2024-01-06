import { Context } from "@nuxt/types";

export default async function ({ store, redirect, app }: Context) {
  try {
    const { _id } = await store.dispatch("auth/VERIFY_ACCESS");

    if (_id) {
      return redirect(app.localePath("/"));
    }
  } catch (error) {
    console.error(error);
  }
}
