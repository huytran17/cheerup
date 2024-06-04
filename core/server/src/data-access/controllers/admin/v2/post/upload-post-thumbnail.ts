import { Request } from "express";
import { get } from "lodash";
import { IDiskUpload } from "../../../../../config/multer/make-disk-upload";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import {
  GetPost,
  IGetPostPayload,
} from "../../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../../use-cases/post/update-post";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeUploadPostThumbnailController({
  getPost,
  updatePost,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
}) {
  return async function uploadPostThumbnailController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetPostPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const file = <IDiskUpload>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      deleteUploadedFile(exists.thumbnail_url);

      const file_path = getFIleUploadedPath(file.path);
      const post_details = {
        ...exists,
        thumbnail: {
          ...file,
          path: file_path,
          destination: getFIleUploadedPath(file.destination),
        },
        seo: {
          ...exists.seo,
          thumbnail: file_path,
        },
      };

      const updated_post = await updatePost(post_details);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_post,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
