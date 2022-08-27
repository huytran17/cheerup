import _ from "lodash";

export default {
  computed: {
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
