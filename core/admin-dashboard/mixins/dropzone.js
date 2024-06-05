import _ from "lodash";

export default {
  methods: {
    uploadAdminAvatarOptions({ id }) {
      return this.getDropzoneOptions(`admin/upload-avatar/${id}`);
    },

    uploadUserAvatarOptions({ id }) {
      return this.getDropzoneOptions(`user/upload-avatar/${id}`);
    },

    uploadCategoryThumbnailOptions({ id }) {
      return this.getDropzoneOptions(`category/upload-thumbnail/${id}`);
    },

    uploadPostThumbnailOptions({ id }) {
      return this.getDropzoneOptions(`post/upload-thumbnail/${id}`);
    },

    uploadThumbnailOptions({ id }) {
      return this.getDropzoneOptions(
        `system-configuration/upload-thumbnail/${id}`
      );
    },

    uploadOwnerAvatarOptions({ id }) {
      return this.getDropzoneOptions(
        `system-configuration/upload-owner-avatar/${id}`
      );
    },

    uploadFolderIconOptions({ id }) {
      return this.getDropzoneOptions(
        `system-configuration/upload-folder-icon/${id}`
      );
    },

    uploadGalleryItemOptions({ id }) {
      return this.getDropzoneOptions(`gallery/upload-gallery-item/${id}`);
    },

    getDropzoneOptions(endpoint) {
      return {
        url: `${process.env.SERVER_URL}/admin/v2/${endpoint}`,
        thumbnailWidth: 200,
        maxFilesize: 5,
        addRemoveLinks: true,
        maxFiles: 1,
        withCredentials: true,
        acceptedFiles: ["image/*"],
      };
    },
  },
};
