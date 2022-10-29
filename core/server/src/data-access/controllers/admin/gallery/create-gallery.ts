import { ICreateGallery } from "../../../../use-cases/gallery/create-gallery";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

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
      const galleryDetails = _.get(httpRequest, "context.validated");

      const { _id: user_id } = _.get(httpRequest, "context.user");

      const final_gallery_data = Object.assign({}, galleryDetails, {
        uploaded_by: user_id,
      });

      const created_gallery = await createGallery({
        galleryDetails: final_gallery_data,
      });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_gallery,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}
