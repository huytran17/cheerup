import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AuthState } from ".";
import { update } from "lodash";

const mutations: MutationTree<AuthState> = {
  [MutationTypes.SET_QR_DATA](state, { data }: { data: boolean }) {
    state.qr_data = data;
  },

  [MutationTypes.SET_IS_OPEN_2FA_QR_MODAL](state, { data }: { data: boolean }) {
    state.is_open_2fa_qr_modal = data;
  },

  [MutationTypes.SET_IS_OPEN_2FA_MODAL](state, { data }: { data: boolean }) {
    state.is_open_2fa_modal = data;
  },

  [MutationTypes.SET_HAS_USER](state, { data }: { data: boolean }) {
    state.has_user = data;
  },

  [MutationTypes.SET_ME](state, { data }: { data: any }) {
    state.me = data;
  },

  [MutationTypes.UPDATE_ME_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.me = update(state.me, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
