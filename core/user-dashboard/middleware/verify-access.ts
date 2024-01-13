import { Context } from "@nuxt/types";

export default async function ({ store }: Context) {
  try {
    const { _id } = await store.dispatch("auth/GET_ME");

    !_id && redirect(app.localePath("/login"));
  } catch (error) {
    console.error(error);
  }
}
