import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post: "post/post",
      posts: "post/posts",
      latest_posts: "post/latest_posts",
      post_pagination: "post/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS: "post/GET_POSTS",
      GET_POST: "post/GET_POST",
      GET_LATEST_POSTS: "post/GET_LATEST_POSTS",
      GET_POSTS_PAGINATED: "post/GET_POSTS_PAGINATED",
    }),
  },
};
