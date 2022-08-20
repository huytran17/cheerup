import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      feedback: "feedback/feedback",
      feedbacks: "feedback/feedbacks",
    }),
  },
  methods: {
    ...mapActions({
      GET_FEEDBACKS: "feedback/GET_FEEDBACKS",
      GET_FEEDBACK: "feedback/GET_FEEDBACK",
      CREATE_FEEDBACK: "feedback/CREATE_FEEDBACK",
      UPDATE_FEEDBACK: "feedback/UPDATE_FEEDBACK",
      DELETE_FEEDBACK: "feedback/DELETE_FEEDBACK",
      UPLOAD_FEEDBACK_THUMBNAIL: "feedback/UPLOAD_FEEDBACK_THUMBNAIL",
      HARD_DELETE_FEEDBACK: "feedback/HARD_DELETE_FEEDBACK",
      GET_FEEDBACK_ANALYTICS: "feedback/GET_FEEDBACK_ANALYTICS",
    }),
    ...mapMutations({
      SET_FEEDBACK: "feedback/SET_FEEDBACK",
      SET_FEEDBACKS: "feedback/SET_FEEDBACKS",
    }),

    updateUserObject({ variable_path, data }) {
      this.UPDATE_FEEDBACK_DATA({
        variable_path,
        data,
      });
    },
  },
};
