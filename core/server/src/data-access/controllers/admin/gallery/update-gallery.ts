import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IUpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUpdateGalleryController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: IGetGallery;
  updateGallery: IUpdateGallery;
  logger: Logger;
}) {
  return async function updateGalleryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const galleryDetails = _.get(httpRequest, "context.validated");
      const { _id } = galleryDetails;
      const exists = await getGallery({ _id });
      if (!exists) {
        throw new Error(`Gallery by ${_id} does not exist`);
      }

      const updated_post = await updateGallery({ galleryDetails });
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
