import _ from "lodash";
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
      GET_COMMENT: "comment/GET_COMMENT",
      CREATE_COMMENT: "comment/CREATE_COMMENT",
      UPDATE_COMMENT: "comment/UPDATE_COMMENT",
      UPLOAD_COMMENT_THUMBNAIL: "comment/UPLOAD_COMMENT_THUMBNAIL",
      HARD_DELETE_COMMENT: "comment/HARD_DELETE_COMMENT",
    }),
    ...mapMutations({
      SET_COMMENT: "comment/SET_COMMENT",
      SET_COMMENTS: "comment/SET_COMMENTS",
    }),

    updateUserObject({ variable_path, data }) {
      this.UPDATE_COMMENT_DATA({
        variable_path,
        data,
      });
    },
  },
};
