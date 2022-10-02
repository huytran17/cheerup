import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post_bookmark: "post-bookmark/post_bookmark",
      post_bookmarks: "post-bookmark/post_bookmarks",
      pagination: "post-bookmark/pagination",
    }),
  },
  methods: {
    ...mapActions({
      CREATE_OR_DELETE_POST_BOOKMARK:
        "post-bookmark/CREATE_OR_DELETE_POST_BOOKMARK",
      GET_POST_BOOKMARKS_PAGINATED:
        "post-bookmark/GET_POST_BOOKMARKS_PAGINATED",
    }),

    ...mapMutations({
      SET_POST_BOOKMARK: "post-bookmark/SET_POST_BOOKMARK",
      SET_POST_BOOKMARKS: "post-bookmark/SET_POST_BOOKMARKS",
      UPDATE_POST_BOOKMARK_DATA: "post-bookmark/UPDATE_POST_BOOKMARK_DATA",
      SET_POST_BOOKMARK_PAGINATION:
        "post-bookmark/SET_POST_BOOKMARK_PAGINATION",
    }),

    updatePostBookmarkObject({ variable_path, data }) {
      this.UPDATE_POST_BOOKMARK_DATA({
        variable_path,
        data,
      });
    },
  },
};
