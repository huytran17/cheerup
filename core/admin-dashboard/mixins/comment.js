import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment: "comment/comment",
      comments: "comment/comments",
    }),
  },
  methods: {
    ...mapActions({
      GET_COMMENTS: "comment/GET_COMMENTS",
      HARD_DELETE_COMMENT: "comment/HARD_DELETE_COMMENT",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
    }),
  },
};
