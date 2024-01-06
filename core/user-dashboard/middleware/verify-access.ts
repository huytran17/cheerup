import { Context } from "@nuxt/types";

export default async function ({ store }: Context) {
  try {
    const { _id } = await store.dispatch("auth/VERIFY_ACCESS");

    _id && (await store.dispatch("auth/GET_ME"));
  } catch (error) {
    console.error(error);
  }
}
