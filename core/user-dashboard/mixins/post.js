import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      is_post_loading: "post/loading",
      post: "post/post",
      posts: "post/posts",
      suggestion_posts: "post/suggestion_posts",
      post_pagination: "post/pagination",
      post_search_query: "post/post_search_query",
      categories_filters: "post/categories_filters",
      tags_filters: "post/tags_filters",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS: "post/GET_POSTS",
      GET_POST: "post/GET_POST",
      GET_SUGGESTION_POSTS: "post/GET_SUGGESTION_POSTS",
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),

    ...mapMutations({
      SET_POST_LOADING: "post/SET_LOADING",
      SET_CATEGORIES_FILTERS: "post/SET_CATEGORIES_FILTERS",
      SET_TAGS_FILTERS: "post/SET_TAGS_FILTERS",
      SET_POST_SEARCH_QUERY: "post/SET_POST_SEARCH_QUERY",
    }),

    async getMorePosts({
      page,
      query,
      new_state = false,
      entries_per_page = 15,
      categories = [],
      tags = [],
    }) {
      try {
        const more_to_fetch =
          this.post_pagination.current_page <=
            this.post_pagination.total_pages &&
          page <= this.post_pagination.total_pages;

        const no_fetching = !more_to_fetch && page > 1;

        if (no_fetching) {
          console.warn("No more posts to fetch. Doing nothing.");
          return;
        }

        return await this.GET_POSTS_PAGINATED({
          page,
          query,
          new_state,
          entries_per_page,
          categories,
          tags,
        });
      } catch (error) {
        console.error(error);
        this.$notification.error(`Encountered error getting posts: ${error}`);
      }
    },
  },
};
