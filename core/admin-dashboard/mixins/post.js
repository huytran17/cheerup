import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      titleRules: [(v) => !!v || this.$t("Title is required.")],
    };
  },
  computed: {
    ...mapGetters({
      post: "post/post",
      posts: "post/posts",
      post_analys_data: "post/post_analys_data",
      most_popular_posts_analys_data: "post/most_popular_posts_analys_data",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS: "post/GET_POSTS",
      GET_POST: "post/GET_POST",
      CREATE_POST: "post/CREATE_POST",
      UPDATE_POST: "post/UPDATE_POST",
      DELETE_POST: "post/DELETE_POST",
      HARD_DELETE_POST: "post/HARD_DELETE_POST",
      UNBLOCK_POST_COMMENT: "post/UNBLOCK_POST_COMMENT",
      BLOCK_POST_COMMENT: "post/BLOCK_POST_COMMENT",
      RESTORE_POST: "post/RESTORE_POST",
      GET_POST_ANALYTICS: "post/GET_POST_ANALYTICS",
    }),
    ...mapMutations({
      SET_POST: "post/SET_POST",
      SET_POSTS: "post/SET_POSTS",
      UPDATE_POST_DATA: "post/UPDATE_POST_DATA",
    }),

    updatePostObject({ path, data }) {
      this.UPDATE_POST_DATA({ path, data });
    },
  },
};
