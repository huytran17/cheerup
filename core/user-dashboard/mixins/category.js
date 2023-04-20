import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      category: "category/category",
      categories: "category/categories",
      category_titles: "category/category_titles",
      category_pagination: "category/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_CATEGORIES: "category/GET_CATEGORIES",
      GET_CATEGORY: "category/GET_CATEGORY",
      GET_CATEGORY_TITLES: "category/GET_CATEGORY_TITLES",
      GET_OUTSTANDING_CATEGORIES_PAGINATED:
        "category/GET_OUTSTANDING_CATEGORIES_PAGINATED",
    }),

    ...mapMutations({
      SET_CATEGORY: "category/SET_CATEGORY",
      SET_CATEGORIES: "category/SET_CATEGORIES",
      UPDATE_CATEGORY_DATA: "category/UPDATE_CATEGORY_DATA",
    }),

    async getMoreCategories({
      page,
      query,
      new_state = false,
      entries_per_page = 15,
    }) {
      try {
        const more_to_fetch =
          this.category_pagination.current_page <=
            this.category_pagination.total_pages &&
          page <= this.category_pagination.total_pages;

        const no_fetching = !more_to_fetch && page > 1;

        if (no_fetching) {
          return console.warn("No more categories to fetch. Doing nothing.");
        }

        return await this.GET_OUTSTANDING_CATEGORIES_PAGINATED({
          page,
          query,
          new_state,
          entries_per_page,
        });
      } catch (error) {
        console.error(error);
        this.$toast.error(`Encountered error getting categories: ${error}`);
      }
    },

    updateCategoryObject({ variable_path, data }) {
      this.UPDATE_CATEGORY_DATA({
        variable_path,
        data,
      });
    },
  },
};
