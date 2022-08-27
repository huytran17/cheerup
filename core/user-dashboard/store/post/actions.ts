import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { ActionTree } from "vuex";
import { PostState } from ".";
import { RootState } from "..";
import _ from "lodash";

const actions: ActionTree<PostState, RootState> = {
  async [ActionTypes.GET_POST]({ commit }, { id }: { id: string }) {
    const { data: post } = await this.$axios.$get(`/post/${id}`);

    commit(MutationTypes.SET_POST, { data: post });

    return post;
  },
};

export default actions;
