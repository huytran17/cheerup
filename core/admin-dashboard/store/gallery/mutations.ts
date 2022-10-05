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

  [MutationTypes.SET_GALLERIES](state, { data }: { data: any[] }) {
    state.galleries = data;
  },
};

export default mutations;
