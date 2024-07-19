import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post_bookmark: "post-bookmark/post_bookmark",
      post_bookmarks: "post-bookmark/post_bookmarks",
      post_bookmark_pagination: "post-bookmark/pagination",
      post_bookmarks_count: "post-bookmark/post_bookmarks_count",
    }),
  },
  methods: {
    ...mapActions({
      CREATE_OR_DELETE_POST_BOOKMARK:
        "post-bookmark/CREATE_OR_DELETE_POST_BOOKMARK",
      GET_POST_BOOKMARKS_PAGINATED:
        "post-bookmark/GET_POST_BOOKMARKS_PAGINATED",
      COUNT_POST_BOOKMARKS: "post-bookmark/COUNT_POST_BOOKMARKS",
    }),

    ...mapMutations({
      SET_POST_BOOKMARK: "post-bookmark/SET_POST_BOOKMARK",
      SET_POST_BOOKMARKS: "post-bookmark/SET_POST_BOOKMARKS",
      UPDATE_POST_BOOKMARK_DATA: "post-bookmark/UPDATE_POST_BOOKMARK_DATA",
      SET_POST_BOOKMARK_PAGINATION:
        "post-bookmark/SET_POST_BOOKMARK_PAGINATION",
    }),

    async getMorePostBookmarks({
      page,
      query,
      new_state = false,
      entries_per_page = 15,
    }) {
      try {
        const more_to_fetch =
          this.post_bookmark_pagination.current_page <=
            this.post_bookmark_pagination.total_pages &&
          page <= this.post_bookmark_pagination.total_pages;

        const no_fetching = !more_to_fetch && page > 1;

        if (no_fetching) {
          return console.warn("No more data to fetch. Doing nothing.");
        }

        return await this.GET_POST_BOOKMARKS_PAGINATED({
          page,
          query,
          new_state,
          entries_per_page,
        });
      } catch (error) {
        console.error(error);
        this.$toast.error(`Encountered error getting posts: ${error}`);
      }
    },

    updatePostBookmarkObject({ path, data }) {
      this.UPDATE_POST_BOOKMARK_DATA({ path, data });
    },
  },
};
