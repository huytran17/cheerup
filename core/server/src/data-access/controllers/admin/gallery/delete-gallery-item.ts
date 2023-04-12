import { Request } from "express";
import { IUpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { get, filter } from "lodash";
import { Logger } from "winston";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

export default function makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: IGetGallery;
  updateGallery: IUpdateGallery;
  logger: Logger;
}) {
  return async function deleteGalleryItemController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        _id: gallery_id,
        bucket,
        key,
      } = get(httpRequest, "context.validated");

      const gallery_exists = await getGallery({ _id: gallery_id });

      if (isEmpty(gallery_exists)) {
        throw new Error(`Gallery by id ${gallery_id} does not exists`);
      }

      const current_gallery_items = get(gallery_exists, "items", []);

      const item_to_delete = current_gallery_items.find(
        (item) => item.bucket === bucket && item.key === key
      );

      const current_bucket = get(item_to_delete, "bucket");
      const current_key = get(item_to_delete, "key");

      deleteS3Object({ bucket: current_bucket, key: current_key });

      const updated_gallery_items = filter(
        current_gallery_items,
        (item) => item.key !== key
      );

      const final_gallery_details = Object.assign({}, gallery_exists, {
        items: updated_gallery_items,
      });

      const updated_data = await updateGallery({
        galleryDetails: final_gallery_details,
      });

      logger.verbose(`Deleted gallery item ${gallery_exists.name}`);

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
