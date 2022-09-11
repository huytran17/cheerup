import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment: "comment/comment",
      new_comment: "comment/new_comment",
      comments: "comment/comments",
      comment_loading: "comment/loading",
    }),
  },
  methods: {
    ...mapActions({
      GET_COMMENTS: "comment/GET_COMMENTS",
      GET_COMMENT: "comment/GET_COMMENT",
      CREATE_COMMENT: "comment/CREATE_COMMENT",
      UPDATE_COMMENT: "comment/UPDATE_COMMENT",
      DELETE_COMMENT: "comment/DELETE_COMMENT",
      HARD_DELETE_COMMENT: "comment/HARD_DELETE_COMMENT",
      GET_COMMENTS_BY_POST: "comment/GET_COMMENTS_BY_POST",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
      UPDATE_NEW_COMMENT_DATA: "comment/UPDATE_NEW_COMMENT_DATA",
      UPDATE_COMMENT_DATA: "comment/UPDATE_COMMENT_DATA",
      SET_COMMENT_LOADING: "comment/SET_LOADING",
    }),

    updateCommentObject({ variable_path, data }) {
      this.UPDATE_COMMENT_DATA({
        variable_path,
        data,
      });
    },

    updateNewCommentObject({ variable_path, data }) {
      this.UPDATE_NEW_COMMENT_DATA({
        variable_path,
        data,
      });
    },
  },
};
