import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { GalleryState } from ".";
import _ from "lodash";

const mutations: MutationTree<GalleryState> = {
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },

  [MutationTypes.SET_GALLERY](state, { data }: { data: any }) {
    state.gallery = data;
  },

  [MutationTypes.SET_GALLERY_PAGINATION](
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

  [MutationTypes.SET_GALLERIES](
    state,
    { data, new_state }: { data: any[]; new_state: boolean }
  ) {
    if (new_state) {
      state.galleries = data;
      return;
    }

    state.galleries = _.uniqBy(_.concat(state.galleries, data), "_id");
  },
};

export default mutations;
