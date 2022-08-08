import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.GET_POSTS]({ commit }, params = {}) {
    const keep_in_store = _.get(params, "keep_in_store", true);

    const { data: posts } = await this.$axios.$get("/post");

    if (!keep_in_store) {
      return posts;
    }

    commit(MutationTypes.SET_POSTS, { data: posts });

    return posts;
  },

  async [ActionTypes.GET_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$get(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.CREATE_POST]({ commit }, { data }: { data: any }) {
    const { data: post } = await this.$axios.$post(`/post`, data);

    return post;
  },

  async [ActionTypes.UPDATE_POST]({ commit }, { data }: { data: any }) {
    const { data: post } = await this.$axios.$put(`/post`, data);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.DELETE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$delete(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.HARD_DELETE_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$delete(`/post/hard-delete/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },

  async [ActionTypes.UPLOAD_POST_THUMBNAIL](
    { commit },
    { file }: { file: any }
  ) {
    const form_data = new FormData();
    form_data.append("file", file);

    const { data: post } = await this.$axios.$put(
      `/post/upload-avatar`,
      form_data
    );

    return post;
  },
};

export default actions;
