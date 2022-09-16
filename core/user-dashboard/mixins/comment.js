import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      comment: "comment/comment",
      new_comment: "comment/new_comment",
      comments: "comment/comments",
      comment_loading: "comment/loading",
      new_reply_comment: "comment/new_reply_comment",
      editing_comment: "comment/editing_comment",
      is_open_reply_comment: "is_open_reply_comment",
      is_open_edit_comment: "is_open_edit_comment",
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
      LIKE_COMMENT: "comment/LIKE_COMMENT",
      DISLIKE_COMMENT: "comment/DISLIKE_COMMENT",
      REPLY_COMMENT: "comment/REPLY_COMMENT",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
      UPDATE_NEW_COMMENT_DATA: "comment/UPDATE_NEW_COMMENT_DATA",
      UPDATE_NEW_REPLY_COMMENT_DATA: "comment/UPDATE_NEW_REPLY_COMMENT_DATA",
      UPDATE_COMMENT_DATA: "comment/UPDATE_COMMENT_DATA",
      SET_COMMENT_LOADING: "comment/SET_LOADING",
      UPDATE_EDITING_COMMENT_DATA: "comment/UPDATE_EDITING_COMMENT_DATA",
      SET_IS_OPEN_EDIT_COMMENT: "SET_IS_OPEN_EDIT_COMMENT",
      SET_IS_OPEN_REPLY_COMMENT: "SET_IS_OPEN_REPLY_COMMENT",
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

    updateNewReplyCommentObject({ variable_path, data }) {
      this.UPDATE_NEW_REPLY_COMMENT_DATA({
        variable_path,
        data,
      });
    },

    updateEditingCommentObject({ variable_path, data }) {
      this.UPDATE_EDITING_COMMENT_DATA({
        variable_path,
        data,
      });
    },
  },
};
