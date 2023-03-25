import { Request } from "express";
import { IUpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import _ from "lodash";
import { Logger } from "winston";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
  storage,
  logger,
}: {
  getGallery: IGetGallery;
  updateGallery: IUpdateGallery;
  storage: typeof Storage;
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
      } = _.get(httpRequest, "context.validated");

      const gallery_exists = await getGallery({ _id: gallery_id });

      if (isEmpty(gallery_exists)) {
        throw new Error(`Gallery by id ${gallery_id} does not exists`);
      }

      const current_gallery_items = _.get(gallery_exists, "items", []);

      const item_to_delete = current_gallery_items.find(
        (item) => item.bucket === bucket && item.key === key
      );

      const current_bucket = _.get(item_to_delete, "bucket", "");
      const current_key = _.get(item_to_delete, "key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        storage.deleteS3Object(s3_params);
      }

      const updated_gallery_items = _.filter(
        current_gallery_items,
        (item) => item.key !== key
      );

      const final_gallery_details = Object.assign({}, gallery_exists, {
        items: updated_gallery_items,
      });

      const updated_data = await updateGallery({
        galleryDetails: final_gallery_details,
      });

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
