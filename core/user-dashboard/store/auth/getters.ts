import { GetterTree } from "vuex";
import { AuthState } from "./";
import { RootState } from "../";

export const getters: GetterTree<AuthState, RootState> = {
  prefix() {
    return "/auth";
  },
  me: (state) => state.me,
  has_user: (state) => state.has_user,
  is_open_2fa_modal: (state) => state.is_open_2fa_modal,
  is_open_2fa_qr_modal: (state) => state.is_open_2fa_qr_modal,
  qr_data: (state) => state.qr_data,
};

export default getters;
