import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostBookmarkState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PostBookmarkState, RootState> = {
  async [ActionTypes.CREATE_OR_DELETE_POST_BOOKMARK](
    { commit },
    { data }: { data: any }
  ) {
    const { data: post_bookmark } = await this.$axios.$put(
      `/post-bookmark/create-or-delete`,
      data
    );

    return post_bookmark;
  },

  async [ActionTypes.GET_POST_BOOKMARKS_PAGINATED]({ commit }, params = {}) {
    const new_state = _.get(params, "new_state", true);
    const keep_in_store = _.get(params, "keep_in_store", true);
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "entries_per_page", 15);

    const url_query = new URLSearchParams();

    if (page) {
      url_query.set("page", page);
    }

    if (entries_per_page) {
      url_query.set("entries_per_page", entries_per_page);
    }

    const { data: post_bookmarks, pagination } = await this.$axios.$get(
      `/post-bookmark/all-paginated?${url_query}`
    );

    if (!keep_in_store) {
      return { post_bookmarks, pagination };
    }

    commit(MutationTypes.SET_POST_BOOKMARKS, {
      data: post_bookmarks,
      new_state,
    });

    commit(MutationTypes.SET_POST_BOOKMARK_PAGINATION, { data: pagination });
  },
};

export default actions;
