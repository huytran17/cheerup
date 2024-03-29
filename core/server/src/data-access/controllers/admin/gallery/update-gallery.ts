import { GetGallery } from "../../../../use-cases/gallery/get-gallery";
import {
  IUpdateGalleryPayload,
  UpdateGallery,
} from "../../../../use-cases/gallery/update-gallery";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
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
      const galleryDetails = <IUpdateGalleryPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = galleryDetails;

      const exists = await getGallery({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Gallery by ${_id} does not exist`);
      }

      const updated_post = await updateGallery({ galleryDetails });

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
