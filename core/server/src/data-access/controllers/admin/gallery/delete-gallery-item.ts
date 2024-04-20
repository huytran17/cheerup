import { Request } from "express";
import { UpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { GetGallery } from "../../../../use-cases/gallery/get-gallery";
import { get, filter } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

interface IPayload {
  _id: string;
  bucket: string;
  key: string;
}

export default function makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: GetGallery;
  updateGallery: UpdateGallery;
  logger: Logger;
}) {
  return async function deleteGalleryItemController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        _id: gallery_id,
        bucket,
        key,
      } = <IPayload>get(httpRequest, "context.validated", {});

      const gallery_exists = await getGallery({ _id: gallery_id });

      if (isEmpty(gallery_exists)) {
        throw new Error(`Gallery by id ${gallery_id} does not exists`);
      }

      const current_gallery_items = get(gallery_exists, "items", []);

      // const item_to_delete = current_gallery_items.find(
      //   (item) => item.bucket === bucket && item.key === key
      // );

      // const current_bucket = <string>get(item_to_delete, "bucket", "");
      // const current_key = <string>get(item_to_delete, "key", "");

      // deleteS3Object({ bucket: current_bucket, key: current_key });

      const updated_gallery_items = filter(
        current_gallery_items,
        (item) => item.key !== key
      );

      const final_gallery_details = {
        ...gallery_exists,
        items: updated_gallery_items,
      };

      const updated_data = await updateGallery(final_gallery_details);

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
