import { get } from "lodash";
import { ActionTree } from "vuex";
import { PostBookmarkState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<PostBookmarkState, RootState> = {
  async [ActionTypes.CREATE_OR_DELETE_POST_BOOKMARK](
    { commit },
    { data }: { data: any }
  ) {
    await this.$axios.$put(`/post-bookmark/create-or-delete`, data);
  },

  async [ActionTypes.COUNT_POST_BOOKMARKS]({ commit }) {
    const { data } = await this.$axios.$get(
      `/post-bookmark/count-post-bookmarks`
    );

    commit(MutationTypes.SET_POST_BOOKMARKS_COUNT, {
      data,
    });
  },

  async [ActionTypes.GET_POST_BOOKMARKS_PAGINATED]({ commit }, params = {}) {
    const new_state = get(params, "new_state", true);
    const keep_in_store = get(params, "keep_in_store", true);
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const url_query = new URLSearchParams();

    page && url_query.set("page", page);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/post-bookmark/all-paginated?${url_query}`
    );

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_POST_BOOKMARKS, { data, new_state });
    commit(MutationTypes.SET_POST_BOOKMARK_PAGINATION, { data: pagination });
  },
};

export default actions;
