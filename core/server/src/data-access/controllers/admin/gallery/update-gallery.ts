import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetGallery } from "../../../../use-cases/gallery/get-gallery";
import {
  IUpdateGalleryPayload,
  UpdateGallery,
} from "../../../../use-cases/gallery/update-gallery";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateGalleryController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: GetGallery;
  updateGallery: UpdateGallery;
  logger: Logger;
}) {
  return async function updateGalleryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const gallery_details = <IUpdateGalleryPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = gallery_details;

      const exists = await getGallery({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Gallery by ${_id} does not exist`);
      }

      const updated_post = await updateGallery(gallery_details);

      logger.verbose(`Updated gallery ${exists.name} successfully`);

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
