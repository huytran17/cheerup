import { get, isEmpty, join } from "lodash";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.INCREASE_POST_VIEWS](
    { commit },
    { _id }: { _id: string }
  ) {
    await this.$axios.$put(`/post/increase-post-views/${_id}`);
  },

  async [ActionTypes.EXPORT_POST_PDF]({ commit }, { _id }: { _id: string }) {
    const { data } = await this.$axios.$get(`/post/export-pdf/${_id}`);
    return data;
  },

  async [ActionTypes.GET_POST_BY_SLUG](
    { commit },
    { slug, user_id }: { slug: string; user_id: string }
  ) {
    const url_query = new URLSearchParams();

    user_id && url_query.set("user_id", user_id);

    const { data } = await this.$axios.$get(
      `/post/by-slug/${slug}?${url_query}`
    );

    commit(MutationTypes.SET_POST, { data });

    return data;
  },

  async [ActionTypes.GET_SUGGESTION_POSTS]({ commit }, params = {}) {
    const amount = get(params, "amount", 5);
    const categories = get(params, "categories", []);
    const exclude_ids = get(params, "exclude_ids", []);

    const url_query = new URLSearchParams();

    amount && url_query.set("amount", amount);

    !isEmpty(categories) && url_query.set("categories", join(categories, ","));

    !isEmpty(exclude_ids) &&
      url_query.set("exclude_ids", join(exclude_ids, ","));

    const { data } = await this.$axios.$get(
      `/post/suggestion-posts?${url_query}`
    );

    commit(MutationTypes.SET_SUGGESTION_POSTS, { data });
  },

  async [ActionTypes.GET_POSTS_PAGINATED]({ commit, state }, params = {}) {
    const query = get(params, "query");
    const page = get(params, "page", 1);
    const entries_per_page = get(params, "entries_per_page", 15);
    const new_state = get(params, "new_state", true);
    const keep_in_store = get(params, "keep_in_store", true);
    const categories = get(params, "categories", []);
    const tags = get(params, "tags", []);
    const sorts = get(params, "sorts");
    const user_id = get(params, "user_id");

    const url_query = new URLSearchParams();

    query && url_query.set("query", query);

    sorts && url_query.set("sorts", JSON.stringify(sorts));

    user_id && url_query.set("user_id", user_id);

    page && url_query.set("page", page);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    !isEmpty(categories) && url_query.set("categories", categories.join(","));

    !isEmpty(tags) && url_query.set("tags", tags.join(","));

    const { data, pagination } = await this.$axios.$get(
      `/post/all-paginated?${url_query}`
    );

    if (!keep_in_store) {
      return { data, pagination };
    }

    commit(MutationTypes.SET_POSTS, { data, new_state });
    commit(MutationTypes.SET_POST_PAGINATION, { data: pagination });
  },
};

export default actions;
