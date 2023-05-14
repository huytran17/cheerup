import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { GalleryState } from ".";
import { RootState } from "..";
import { get } from "lodash";

const actions: ActionTree<GalleryState, RootState> = {
  async [ActionTypes.GET_GALLERIES_PAGINATED]({ commit }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "page", 15);
    const is_parent = get(params, "is_parent", true);
    const new_state = get(params, "new_state", true);
    const keep_in_store = get(params, "keep_in_store", true);

    let url_query = new URLSearchParams();

    query && url_query.set("query", query);

    page && url_query.set("page", page);

    is_parent && url_query.set("is_parent", is_parent);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/gallery?${url_query}`
    );

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_GALLERIES, { data, new_state });
    commit(MutationTypes.SET_GALLERY_PAGINATION, { data: pagination });

    return data;
  },

  async [ActionTypes.GET_GALLERIES_BY_PARENT](
    { commit },
    { parent_id }: { parent_id: string }
  ) {
    const { data } = await this.$axios.$get(`/gallery/by-parent/${parent_id}`);

    commit(MutationTypes.SET_GALLERIES, { data, new_state: true });

    return data;
  },

  async [ActionTypes.DELETE_GALLERY_ITEM]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: updated_gallery } = await this.$axios.$put(
      `/gallery/delete-gallery-item/${_id}`,
      data
    );

    return updated_gallery;
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
    const { data: gallery } = await this.$axios.$post(
      `/upload-gallery-item/${_id}`
    );

    return gallery;
  },

  async [ActionTypes.GET_GALLERY]({ commit }, { _id }: { _id: string }) {
    const { data: gallery } = await this.$axios.$get(`/gallery/${_id}`);

    commit(MutationTypes.SET_GALLERY, { data: gallery });
    return gallery;
  },

  async [ActionTypes.UPDATE_GALLERY]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: gallery } = await this.$axios.$put(`/gallery/${_id}`, data);

    commit(MutationTypes.SET_GALLERY, { data: gallery });
    return gallery;
  },
};

export default actions;
