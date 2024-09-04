import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
      categoriesRules: [
        (v) => !!v.length > 0 || this.$t("Category is required."),
      ],
    };
  },
  computed: {
    ...mapGetters({
      category: "category/category",
      categories: "category/categories",
      category_analys_data: "category/category_analys_data",
      category_pagination: "category/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_CATEGORIES: "category/GET_CATEGORIES",
      GET_CATEGORY: "category/GET_CATEGORY",
      CREATE_CATEGORY: "category/CREATE_CATEGORY",
      UPDATE_CATEGORY: "category/UPDATE_CATEGORY",
      DELETE_CATEGORY: "category/DELETE_CATEGORY",
      HARD_DELETE_CATEGORY: "category/HARD_DELETE_CATEGORY",
      RESTORE_CATEGORY: "category/RESTORE_CATEGORY",
      GET_CATEGORY_ANALYTICS: "category/GET_CATEGORY_ANALYTICS",
      GET_CATEGORIES_PAGINATED: "category/GET_CATEGORIES_PAGINATED",
    }),
    ...mapMutations({
      SET_CATEGORY: "category/SET_CATEGORY",
      SET_CATEGORIES: "category/SET_CATEGORIES",
      UPDATE_CATEGORY_DATA: "category/UPDATE_CATEGORY_DATA",
      SET_CATEGORY_ANALYS_DATA: "category/SET_CATEGORY_ANALYS_DATA",
      SET_CATEGORY_PAGINATION: "category/SET_CATEGORY_PAGINATION",
      UPDATE_CATEGORY_PAGINATION: "category/UPDATE_CATEGORY_PAGINATION",
    }),

    updateCategoryObject({ path, data }) {
      this.UPDATE_CATEGORY_DATA({ path, data });
    },
  },
};
