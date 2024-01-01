import { CreateGallery } from "../../../../use-cases/gallery/create-gallery";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeCreateGalleryController({
  createGallery,
  logger,
}: {
  createGallery: CreateGallery;
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

      const { _id: user_id }: { _id: string } = get(
        httpRequest,
        "context.user"
      );

      const final_gallery_data = merge({}, galleryDetails, {
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
