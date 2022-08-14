import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      category: "category/category",
    }),

    category_id() {
      return _.get(this.category, "_id");
    },

    access_token() {
      return `Bearer ${localStorage.getItem("admin_access_token")}`;
    },
  },

  methods: {
    getDropzoneOptions({ upload_url }) {
      return {
        url: `${upload_url}`,
        thumbnailWidth: 200,
        maxFilesize: 5,
        addRemoveLinks: true,
        maxFiles: 1,
        headers: {
          Authorization: this.access_token,
        },
      };
    },
  },
};
