import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      post: "post/post",
      posts: "post/posts",
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS: "post/GET_POSTS",
      GET_POST: "post/GET_POST",
      CREATE_POST: "post/CREATE_POST",
      UPDATE_POST: "post/UPDATE_POST",
      DELETE_POST: "post/DELETE_POST",
      UPLOAD_POST_THUMBNAIL: "post/UPLOAD_POST_THUMBNAIL",
      HARD_DELETE_POST: "post/HARD_DELETE_POST",
    }),
    ...mapMutations({
      SET_POST: "post/SET_POST",
      SET_POSTS: "post/SET_POSTS",
    }),

    updateUserObject({ variable_path, data }) {
      this.UPDATE_POST_DATA({
        variable_path,
        data,
      });
    },
  },
};
