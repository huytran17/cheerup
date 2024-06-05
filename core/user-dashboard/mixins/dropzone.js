export default {
  methods: {
    uploadUserAvatarOptions({ id }) {
      const endpoint = `${process.env.SERVER_URL}/api/v2/user/upload-avatar/${id}`;
      return this.getDropzoneOptions({ endpoint });
    },

    getDropzoneOptions({ endpoint, options = {} }) {
      return {
        url: `${endpoint}`,
        thumbnailWidth: 200,
        maxFilesize: 5,
        addRemoveLinks: true,
        maxFiles: 1,
        withCredentials: true,
        acceptedFiles: ["image/*"],
        ...options,
      };
    },
  },
};
