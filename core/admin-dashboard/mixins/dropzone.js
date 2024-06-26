import { MIME_TYPES } from "@/constants";

export default {
  methods: {
    uploadAdminAvatarOptions({ id }) {
      return this.getDropzoneOptions({ endpoint: `admin/upload-avatar/${id}` });
    },

    uploadUserAvatarOptions({ id }) {
      return this.getDropzoneOptions({ endpoint: `user/upload-avatar/${id}` });
    },

    uploadCategoryThumbnailOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `category/upload-thumbnail/${id}`,
      });
    },

    uploadPostThumbnailOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `post/upload-thumbnail/${id}`,
      });
    },

    uploadThumbnailOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `system-configuration/upload-thumbnail/${id}`,
      });
    },

    uploadOwnerAvatarOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `system-configuration/upload-owner-avatar/${id}`,
      });
    },

    uploadFolderIconOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `system-configuration/upload-folder-icon/${id}`,
      });
    },

    uploadGalleryItemOptions({ id }) {
      return this.getDropzoneOptions({
        endpoint: `gallery/upload-gallery-item/${id}`,
      });
    },

    uploadExcelTemplateOptions({ id, type }) {
      return this.getDropzoneOptions({
        endpoint: `upload-excel/system-configuration/${type}/${id}`,
        options: {
          acceptedFiles: MIME_TYPES.EXCEL,
        },
      });
    },

    getDropzoneOptions({ endpoint, options = {} }) {
      return {
        url: `${process.env.SERVER_URL}/admin/v2/${endpoint}`,
        thumbnailWidth: 200,
        maxFilesize: 5,
        addRemoveLinks: true,
        maxFiles: 1,
        withCredentials: true,
        acceptedFiles: "image/*",
        ...options,
      };
    },
  },
};
