import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { GalleryState } from ".";
import _ from "lodash";

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

    state.galleries = _.uniqBy(_.concat(state.galleries, data), "_id");
  },

  [MutationTypes.UPDATE_GALLERY_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.gallery = _.update(state.gallery, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
