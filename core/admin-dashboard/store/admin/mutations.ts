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

  [MutationTypes.SET_ADMINS](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      return (state.admins = data);
    }

    state.admins = uniqBy(concat(state.admins, data), "_id");
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
        from: number;
        to: number;
      };
    }
  ) {
    state.pagination = data;
  },

  [MutationTypes.UPDATE_ADMIN_PAGINATION](
    state,
    { path, data }: { path: string; data: any }
  ) {
    state.pagination = update(state.pagination, path, (n) => data);
  },
};

export default mutations;
