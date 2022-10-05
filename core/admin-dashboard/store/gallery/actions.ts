import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { GalleryState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<GalleryState, RootState> = {
  async [ActionTypes.GET_GALLERIES_BY_POST](
    { commit },
    { post_id }: { post_id: string }
  ) {
    const { data } = await this.$axios.$get(`/gallery/by-post/${post_id}`);

    commit(MutationTypes.SET_GALLERIES, { data });
    return data;
  },

  async [ActionTypes.HARD_DELETE_GALLERY_ITEM](
    { commit },
    { gallery_id, item_id }: { gallery_id: string; item_id: string }
  ) {
    const { data } = await this.$axios.$delete(
      `/gallery/hard-delete-gallery-item/${gallery_id}/${item_id}`
    );

    return data;
  },

  async [ActionTypes.HARD_DELETE_GALLERY]({ commit }, { id }: { id: string }) {
    const { data: gallery } = await this.$axios.$delete(
      `/gallery/hard-delete/${id}`
    );

    return gallery;
  },
};

export default actions;
