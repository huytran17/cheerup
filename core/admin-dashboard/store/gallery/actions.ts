import { get } from "lodash";
import { ActionTree } from "vuex";
import { GalleryState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

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
  },

  async [ActionTypes.GET_GALLERIES_BY_PARENT](
    { commit },
    { parent_id }: { parent_id: string }
  ) {
    const { data } = await this.$axios.$get(`/gallery/by-parent/${parent_id}`);
    commit(MutationTypes.SET_GALLERIES, { data, new_state: true });
  },

  async [ActionTypes.DELETE_GALLERY_ITEM](
    { commit },
    { _id, item_id }: { _id: string; item_id: string }
  ) {
    await this.$axios.$put(`/v2/gallery/delete-gallery-item/${_id}/${item_id}`);
  },

  async [ActionTypes.HARD_DELETE_GALLERY]({ commit }, { id }: { id: string }) {
    await this.$axios.$delete(`/gallery/hard-delete/${id}`);
  },

  async [ActionTypes.CREATE_GALLERY]({ commit }, { data }: { data: any }) {
    await this.$axios.$post(`/gallery`, data);
  },

  async [ActionTypes.GET_GALLERY]({ commit }, { _id }: { _id: string }) {
    const { data } = await this.$axios.$get(`/gallery/${_id}`);
    commit(MutationTypes.SET_GALLERY, { data });
  },

  async [ActionTypes.UPDATE_GALLERY]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: gallery } = await this.$axios.$put(`/gallery/${_id}`, data);

    commit(MutationTypes.SET_GALLERY, { data: gallery });
  },
};

export default actions;
