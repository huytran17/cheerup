import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { AdminState } from ".";
import { concat, uniqBy, update } from "lodash";

const mutations: MutationTree<AdminState> = {
  [MutationTypes.SET_ADMIN_ANALYS_DATA](state, { data }: { data: any }) {
    state.admin_analys_data = data;
  },

  [MutationTypes.SET_ADMIN](state, { data }: { data: any }) {
    state.admin = data;
  },

  [MutationTypes.SET_ADMINS](state, { data }: { data: any[] }) {
    state.admins = data;
  },

  [MutationTypes.UPDATE_ADMIN_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.admin = update(state.admin, variable_path, (n) => data);
  },

  [MutationTypes.SET_ADMIN_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        per_page: number;
        total: number;
        total_pages: number;
      };
    }
  ) {
    state.pagination = data;
  },
};

export default mutations;
