import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { SubscriptionState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<SubscriptionState, RootState> = {
  async [ActionTypes.CREATE_POST_BOOKMARK](
    { commit },
    { data }: { data: any }
  ) {
    const { data: post_bookmark } = await this.$axios.$post(
      `/post-bookmark`,
      data
    );

    return post_bookmark;
  },

  async [ActionTypes.REMOVE_POST_BOOKMARK]({ commit }) {
    const { data: post_bookmark } = await this.$axios.$put(`/post-bookmark`);

    return post_bookmark;
  },

  async [ActionTypes.GET_POST_BOOKMARKS_PAGINATED]({ commit }, params = {}) {
    const new_state = _.get(params, "new_state", true);
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: post_bookmarks, pagination } = await this.$axios.$get(
      `/post-bookmark/all-paginated`
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
