import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {};
