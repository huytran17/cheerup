import { getPost, updatePost } from "../../../../../use-cases/post";

import makeUploadPostThumbnailController from "./upload-post-thumbnail";

const uploadPostThumbnailController = makeUploadPostThumbnailController({
  getPost,
  updatePost,
});

export default Object.freeze({
  uploadPostThumbnailController,
});

export { uploadPostThumbnailController };
