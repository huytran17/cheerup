import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post: "post/post",
      posts: "post/posts",
      latest_posts: "post/latest_posts",
      post_pagination: "post/pagination",
      post_search_query: "post/post_search_query",
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
      SET_LOADING: "post/SET_LOADING",
    }),

    async getMorePosts({
      page,
      query,
      new_state = false,
      entries_per_page = 15,
    }) {
      const need_load_more = page === 1;
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

        need_load_more &&
          this.SET_LOADING({
            data: true,
          });

        return await this.GET_POSTS_PAGINATED({
          page,
          query,
          new_state,
          entries_per_page,
        });
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error getting posts: ${err}`);
      } finally {
        this.SET_LOADING({
          data: false,
        });
      }
    },
  },
};
