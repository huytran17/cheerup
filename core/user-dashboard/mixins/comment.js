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
      comment_pagination: "comment/pagination",
      comment_count_by_post: "comment/comment_count_by_post",
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
      GET_COMMENTS_BY_POST_PAGINATED: "comment/GET_COMMENTS_BY_POST_PAGINATED",
      LIKE_COMMENT: "comment/LIKE_COMMENT",
      DISLIKE_COMMENT: "comment/DISLIKE_COMMENT",
      REPLY_COMMENT: "comment/REPLY_COMMENT",
      COUNT_COMMENT_BY_POST: "comment/COUNT_COMMENT_BY_POST",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
      UPDATE_NEW_COMMENT_DATA: "comment/UPDATE_NEW_COMMENT_DATA",
      UPDATE_NEW_REPLY_COMMENT_DATA: "comment/UPDATE_NEW_REPLY_COMMENT_DATA",
      UPDATE_COMMENT_DATA: "comment/UPDATE_COMMENT_DATA",
      SET_COMMENT_LOADING: "comment/SET_LOADING",
      UPDATE_EDITING_COMMENT_DATA: "comment/UPDATE_EDITING_COMMENT_DATA",
      UPDATE_COMMENTS_DATA: "comment/UPDATE_COMMENTS_DATA",
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

    replaceCommentData({ data }) {
      const cloned_comments = _.cloneDeep(this.comments);

      const updated_comments = _.map(cloned_comments, (comment, index) => {
        if (comment._id === data._id) {
          return data;
        }

        const comment_children = comment.children?.map((child) => {
          if (child._id === data._id) {
            return data;
          }

          return child;
        });

        cloned_comments[index].children = comment_children;

        return comment;
      });

      this.SET_COMMENTS({ data: updated_comments, new_state: true });
    },

    deleteCommentData({ _id }) {
      const cloned_comments = _.cloneDeep(this.comments);

      const filtered_comments = _.filter(
        cloned_comments,
        (comment) => comment._id !== _id
      );

      const updated_comments = _.map(filtered_comments, (comment, index) => {
        const comment_children = comment.children?.filter((child) => {
          return child._id !== _id;
        });

        filtered_comments[index].children = comment_children;

        return comment;
      });

      this.SET_COMMENTS({ data: updated_comments, new_state: true });
    },
  },
};
