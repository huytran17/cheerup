import { Request } from "express";
import { IUpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import _ from "lodash";
import { Logger } from "winston";

export default function makeHardDeleteGalleryItemController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: IGetGallery;
  updateGallery: IUpdateGallery;
  logger: Logger;
}) {
  return async function hardDeleteGalleryItemController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: gallery_id, _item_id: item_id } = _.get(
        httpRequest,
        "context.validated"
      );

      const gallery_exists = await getGallery({ _id: gallery_id });
      const gallery_not_exists =
        _.isEmpty(gallery_exists) || _.isNil(gallery_exists);

      if (gallery_not_exists) {
        throw new Error(`Gallery by id ${gallery_id} does not exists`);
      }

      const current_gallery_items = _.get(gallery_exists, "items", []);
      const updated_gallery_items = current_gallery_items.filter(
        (item) => item.id !== item_id
      );

      const final_gallery_details = Object.assign({}, gallery_exists, {
        items: updated_gallery_items,
      });

      const updated_data = await updateGallery({
        galleryDetails: final_gallery_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_data,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}
