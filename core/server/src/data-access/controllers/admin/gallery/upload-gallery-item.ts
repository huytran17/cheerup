import { Request } from "express";
import { concat, get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetGallery,
  IGetGallery,
} from "../../../../use-cases/gallery/get-gallery";
import { UpdateGallery } from "../../../../use-cases/gallery/update-gallery";
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
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetGallery>get(httpRequest, "context.validated", {});
      const file = get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const gallery_exists = await getGallery({ _id });

      if (isEmpty(gallery_exists)) {
        throw new Error(`Gallery by id ${_id} does not exist`);
      }

      const current_gallery_items = get(gallery_exists, "items", []);
      const final_gallery_data = {
        ...gallery_exists,
        items: concat(current_gallery_items, [file]),
      };

      const updated_data = await updateGallery(final_gallery_data);

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
