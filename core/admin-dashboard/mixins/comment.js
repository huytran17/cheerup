import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment: "comment/comment",
      comments: "comment/comments",
      comment_pagination: "comment/pagination",
    }),
  },
  methods: {
    ...mapActions({
      GET_COMMENTS: "comment/GET_COMMENTS",
      HARD_DELETE_COMMENT: "comment/HARD_DELETE_COMMENT",
      GET_COMMENTS_PAGINATED: "comment/GET_COMMENTS_PAGINATED",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
      SET_COMMENT_PAGINATION: "comment/SET_COMMENT_PAGINATION",
      UPDATE_COMMENT_PAGINATION: "comment/UPDATE_COMMENT_PAGINATION",
    }),
  },
};
