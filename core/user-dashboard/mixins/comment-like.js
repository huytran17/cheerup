import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({
      CREATE_OR_UPDATE_COMMENT_LIKE:
        "comment-like/CREATE_OR_UPDATE_COMMENT_LIKE",
    }),
  },
};
