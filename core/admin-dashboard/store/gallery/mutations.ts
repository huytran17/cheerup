import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { GalleryState } from ".";
import { uniqBy, concat } from "lodash";

const mutations: MutationTree<GalleryState> = {
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
        from: number;
        to: number;
        has_more: boolean;
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
      return (state.galleries = data);
    }

    state.galleries = uniqBy(concat(state.galleries, data), "_id");
  },
};

export default mutations;
