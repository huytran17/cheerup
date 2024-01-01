import { get, concat, merge } from "lodash";
import { Request } from "express";
import { UpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { GetGallery } from "../../../../use-cases/gallery/get-gallery";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadGalleryItemController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: GetGallery;
  updateGallery: UpdateGallery;
  logger: Logger;
}) {
  return async function uploadGalleryItemController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");
      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const gallery_exists = await getGallery({ _id });

      if (isEmpty(gallery_exists)) {
        throw new Error(`Gallery by id ${_id} does not exist`);
      }

      const current_gallery_items = get(gallery_exists, "items", []);
      const final_gallery_data = merge({}, gallery_exists, {
        items: concat(current_gallery_items, [file]),
      });

      const updated_data = await updateGallery({
        galleryDetails: final_gallery_data,
      });

      logger.verbose(`Updated gallery ${gallery_exists.name} successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_data,
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
