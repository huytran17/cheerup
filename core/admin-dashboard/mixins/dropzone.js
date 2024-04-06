import _ from "lodash";

export default {
  methods: {
    uploadAdminAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/v2/admin/upload-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadUserAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/user/upload-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadCategoryThumbnailOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/v2/category/upload-thumbnail/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadPostThumbnailOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/v2/post/upload-thumbnail/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadAdminFolderIconOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-folder-icon/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadThumbnailOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-thumbnail/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadOwnerAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-owner-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadFolderIconOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-folder-icon/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadGalleryItemOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/v2/gallery/upload-gallery-item/${id}`;
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
