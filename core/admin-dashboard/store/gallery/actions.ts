import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { GalleryState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<GalleryState, RootState> = {
  async [ActionTypes.GET_GALLERIES_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "page", 1);
    const new_state = _.get(params, "new_state", true);
    const keep_in_store = _.get(params, "keep_in_store", true);

    let url_query = new URLSearchParams();

    if (query) {
      url_query.set("query", query);
    }

    if (page) {
      url_query.set("page", page);
    }

    if (entries_per_page) {
      url_query.set("entries_per_page", entries_per_page);
    }

    const { data, pagination } = await this.$axios.$get(`/gallery${url_query}`);

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_GALLERIES, { data, new_state });
    commit(MutationTypes.SET_GALLERY_PAGINATION, { data: pagination });

    return data;
  },

  async [ActionTypes.DELETE_GALLERY_ITEM](
    { commit },
    { _id }: { _id: string }
  ) {
    const { data } = await this.$axios.$put(
      `/gallery/delete-gallery-item/${_id}`
    );

    return data;
  },

  async [ActionTypes.HARD_DELETE_GALLERY]({ commit }, { id }: { id: string }) {
    const { data: gallery } = await this.$axios.$delete(
      `/gallery/hard-delete/${id}`
    );

    return gallery;
  },

  async [ActionTypes.CREATE_GALLERY]({ commit }, { data }: { data: any }) {
    const { data: gallery } = await this.$axios.$post(`/gallery`, data);

    return gallery;
  },

  async [ActionTypes.UPLOAD_GALLERY_ITEM](
    { commit },
    { _id }: { _id: string }
  ) {
    const { data: gallery } = await this.$axios.$put(
      `/upload-gallery-item/${_id}`
    );

    return gallery;
  },

  async [ActionTypes.GET_GALLERY]({ commit }, { _id }: { _id: string }) {
    const { data: gallery } = await this.$axios.$get(`/gallery/${_id}`);

    return gallery;
  },
};

export default actions;
