import { GetterTree } from "vuex";
import { CategoryState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CategoryState, RootState> = {
  prefix() {
    return "/category";
  },
  category: (state) => state.category,
  categories: (state) => state.categories,
};

export default getters;
