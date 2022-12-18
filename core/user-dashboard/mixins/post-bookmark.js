import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post_bookmark: "post-bookmark/post_bookmark",
      post_bookmarks: "post-bookmark/post_bookmarks",
      post_bookmark_pagination: "post-bookmark/pagination",
      post_bookmarks_count: "post-bookmark/post_bookmarks_count",
      post_bookmark_loading: "post-bookmark/loading",
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
      SET_POST_BOOKMARK_LOADING: "post-bookmark/SET_LOADING",
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
      const need_load_more = page === 1;
      try {
        const more_to_fetch =
          this.post_bookmark_pagination.current_page <=
            this.post_bookmark_pagination.total_pages &&
          page <= this.post_bookmark_pagination.total_pages;

        const no_fetching = !more_to_fetch && page > 1;

        if (no_fetching) {
          console.warn("No more posts to fetch. Doing nothing.");
          return;
        }

        need_load_more &&
          this.SET_POST_BOOKMARK_LOADING({
            data: true,
          });

        return await this.GET_POST_BOOKMARKS_PAGINATED({
          page,
          query,
          new_state,
          entries_per_page,
        });
      } catch (error) {
        console.error(error);
        this.$notification.error(`Encountered error getting posts: ${error}`);
      } finally {
        this.SET_POST_BOOKMARK_LOADING({
          data: false,
        });
      }
    },

    updatePostBookmarkObject({ variable_path, data }) {
      this.UPDATE_POST_BOOKMARK_DATA({
        variable_path,
        data,
      });
    },
  },
};
