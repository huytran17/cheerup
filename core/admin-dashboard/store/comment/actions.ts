import { get } from "lodash";
import { ActionTree } from "vuex";
import { CommentState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<CommentState, RootState> = {
  async [ActionTypes.GET_COMMENTS]({ commit }, params = {}) {
    const keep_in_store = get(params, "keep_in_store", true);

    const { data } = await this.$axios.$get("/comment");

    if (!keep_in_store) {
      return data;
    }

    commit(MutationTypes.SET_COMMENTS, { data });
  },

  async [ActionTypes.HARD_DELETE_COMMENT]({ commit }, { id }: { id: string }) {
    const { data } = await this.$axios.$delete(`/comment/hard-delete/${id}`);
    commit(MutationTypes.SET_COMMENT, { data });
  },

  async [ActionTypes.GET_COMMENTS_PAGINATED](
    { commit },
    { params }: { params: any }
  ) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);

    const query_url = new URLSearchParams();

    query && query_url.set("query", query);
    page && query_url.set("page", page);
    entries_per_page && query_url.set("entries_per_page", entries_per_page);

    const { data, pagination } = await this.$axios.$get(
      `/comment/all-paginated?${query_url}`
    );

    commit(MutationTypes.SET_COMMENTS, { data });
    commit(MutationTypes.SET_COMMENT_PAGINATION, { data: pagination });
  },
};

export default actions;
