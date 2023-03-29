import { ICreateGallery } from "../../../../use-cases/gallery/create-gallery";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateGalleryController({
  createGallery,
  logger,
}: {
  createGallery: ICreateGallery;
  logger: Logger;
}) {
  return async function createGalleryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const galleryDetails = get(httpRequest, "context.validated");

      const { _id: user_id } = get(httpRequest, "context.user");

      const final_gallery_data = Object.assign({}, galleryDetails, {
        created_by: user_id,
      });

      const created_gallery = await createGallery({
        galleryDetails: final_gallery_data,
      });

      logger.verbose(`Created gallery ${created_gallery.name}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_gallery,
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
