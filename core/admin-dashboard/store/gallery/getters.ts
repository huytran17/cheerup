import { GetterTree } from "vuex";
import { GalleryState } from ".";
import { RootState } from "..";

export const getters: GetterTree<GalleryState, RootState> = {
  prefix() {
    return "/gallery";
  },
  gallery: (state) => state.gallery,
  galleries: (state) => state.galleries,
  pagination: (state) => state.pagination,
};

export default getters;
