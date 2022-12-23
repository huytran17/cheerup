import _ from "lodash";

export default {
  computed: {
    access_token() {
      return `Bearer ${localStorage.getItem("admin_access_token")}`;
    },
  },

  methods: {
    uploadAdminAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/admin/upload-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadUserAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/user/upload-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadCategoryThumbnailOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/category/upload-thumbnail/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadPostThumbnailOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/post/upload-thumbnail/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadAdminLogoOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-logo/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadAdminFaviconOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-favicon/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadAdminFolderIconOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-folder-icon/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadClientLogoOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-logo/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadClientFaviconOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-favicon/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadClientOwnerAvatarOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-owner-avatar/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

    uploadGalleryItemOptions({ id }) {
      const upload_url = `${process.env.SERVER_URL}/admin/gallery/upload-gallery-item/${id}`;
      return this.getDropzoneOptions({ upload_url });
    },

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
