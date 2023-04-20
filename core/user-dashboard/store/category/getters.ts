import { GetterTree } from "vuex";
import { CategoryState } from ".";
import { RootState } from "..";

export const getters: GetterTree<CategoryState, RootState> = {
  prefix() {
    return "/category";
  },
  category: (state) => state.category,
  categories: (state) => state.categories,
  category_titles: (state) => state.category_titles,
  pagination: (state) => state.pagination,
};

export default getters;
