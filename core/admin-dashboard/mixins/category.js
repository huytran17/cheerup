import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
    };
  },
  computed: {
    ...mapGetters({
      category: "category/category",
      categories: "category/categories",
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
    }),
    ...mapMutations({
      SET_CATEGORY: "category/SET_CATEGORY",
      SET_CATEGORIES: "category/SET_CATEGORIES",
      UPDATE_CATEGORY_DATA: "category/UPDATE_CATEGORY_DATA",
    }),

    updateCategoryObject({ variable_path, data }) {
      this.UPDATE_CATEGORY_DATA({
        variable_path,
        data,
      });
    },
  },
};
