import { Store } from "vuex";
import { isNil } from "lodash";

export default async function ({ store }: { store: Store<any> }) {
  try {
    const access_token = localStorage.getItem("access_token");

    if (!isNil(access_token)) {
      return await store.dispatch("auth/GET_ME");
    }
  } catch (error) {
    console.error(error);
  }
}
