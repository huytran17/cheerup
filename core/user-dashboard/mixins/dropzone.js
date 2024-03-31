export default {
  methods: {
    uploadUserAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/api/v2/user/upload-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    getDropzoneOptions({ upload_url }) {
      return {
        url: `${upload_url}`,
        thumbnailWidth: 200,
        maxFilesize: 5,
        addRemoveLinks: true,
        maxFiles: 1,
        withCredentials: true,
      };
    },
  },
};
