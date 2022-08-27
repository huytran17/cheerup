import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import { PostState } from ".";
import _ from "lodash";

const mutations: MutationTree<PostState> = {
  [MutationTypes.SET_POST](state, { data }: { data: any }) {
    state.post = data;
  },

  [MutationTypes.SET_POSTS](state, { data }: { data: any[] }) {
    state.posts = data;
  },

  [MutationTypes.UPDATE_POST_DATA](
    state,
    { variable_path, data }: { variable_path: string; data: any }
  ) {
    state.post = _.update(state.post, variable_path, (n) => {
      return data;
    });
  },
};

export default mutations;
