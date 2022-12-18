import { Context } from "@nuxt/types";
import { isNil, isEmpty } from "lodash";

export default function ({ store, redirect }: Context) {
  try {
    const user = store.getters["auth/me"];
    const hasUser = !isNil(user) && !isEmpty(user);
    return hasUser || redirect("/login");
  } catch (error) {
    console.log(error);
  }
}
