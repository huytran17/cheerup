import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.UPDATE_POST]({ commit }, { data }: { data: any }) {
    const { _id } = data;
    const { data: post } = await this.$axios.$put(`/post/${_id}`, data);
    return post;
  },

  async [ActionTypes.EXPORT_POST_PDF]({ commit }, { _id }: { _id: string }) {
    const { data } = await this.$axios.$get(`/post/export-pdf/${_id}`);
    return data;
  },

  async [ActionTypes.GET_POST](
    { commit },
    { id, user_id }: { id: string; user_id: string }
  ) {
    const url_query = new URLSearchParams();

    user_id && url_query.set("user_id", user_id);

    const { data: post } = await this.$axios.$get(`/post/${id}?${url_query}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.GET_POST_BY_SLUG](
    { commit },
    { slug, user_id }: { slug: string; user_id: string }
  ) {
    const url_query = new URLSearchParams();

    user_id && url_query.set("user_id", user_id);

    const { data: post } = await this.$axios.$get(
      `/post/by-slug/${slug}?${url_query}`
    );

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.GET_SUGGESTION_POSTS]({ commit }, params = {}) {
    const amount = _.get(params, "amount", 5);
    const categories = _.get(params, "categories", []);
    const exclude_ids = _.get(params, "exclude_ids", []);
    const is_only_published = _.get(params, "is_only_published", true);

    const url_query = new URLSearchParams();

    amount && url_query.set("amount", amount);

    is_only_published && url_query.set("is_only_published", is_only_published);

    !_.isEmpty(categories) &&
      url_query.set("categories", _.join(categories, ","));

    !_.isEmpty(exclude_ids) &&
      url_query.set("exclude_ids", _.join(exclude_ids, ","));

    const { data: posts } = await this.$axios.$get(
      `/post/suggestion-posts?${url_query}`
    );

    commit(MutationTypes.SET_SUGGESTION_POSTS, { data: posts });

    return posts;
  },

  async [ActionTypes.GET_POSTS_PAGINATED]({ commit, state }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);
    const entries_per_page = _.get(params, "entries_per_page", 15);
    const new_state = _.get(params, "new_state", true);
    const is_only_published = _.get(params, "is_only_published", true);
    const categories = _.get(params, "categories", []);
    const tags = _.get(params, "tags", []);
    const sorts = _.get(params, "sorts");
    const user_id = _.get(params, "user_id");

    const url_query = new URLSearchParams();

    query && url_query.set("query", query);

    sorts && url_query.set("sorts", JSON.stringify(sorts));

    user_id && url_query.set("user_id", user_id);

    page && url_query.set("page", page);

    is_only_published && url_query.set("is_only_published", is_only_published);

    entries_per_page && url_query.set("entries_per_page", entries_per_page);

    !_.isEmpty(categories) && url_query.set("categories", categories.join(","));

    !_.isEmpty(tags) && url_query.set("tags", tags.join(","));

    const { data: posts, pagination } = await this.$axios.$get(
      `/post/all-paginated?${url_query}`
    );

    commit(MutationTypes.SET_POSTS, { data: posts, new_state });
    commit(MutationTypes.SET_POST_PAGINATION, { data: pagination });

    return posts;
  },
};

export default actions;
