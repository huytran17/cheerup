import _ from "lodash";
import { Request } from "express";
import { IUpdateGallery } from "../../../../use-cases/gallery/update-gallery";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { Logger } from "winston";

export default function makeUploadGalleryItemController({
  getGallery,
  updateGallery,
  logger,
}: {
  getGallery: IGetGallery;
  updateGallery: IUpdateGallery;
  logger: Logger;
}) {
  return async function uploadGalleryItemController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const file = _.get(httpRequest, "context.file");

      const file_not_exists = _.isEmpty(file) || _.isNil(file);
      if (file_not_exists) {
        throw new Error(`File does not exist`);
      }

      const gallery_exists = await getGallery({ _id });
      const gallery_not_exists =
        _.isEmpty(gallery_exists) || _.isNil(gallery_exists);

      if (gallery_not_exists) {
        throw new Error(`Gallery by id ${_id} does not exist`);
      }

      const current_gallery_items = _.get(gallery_exists, "items", []);
      const final_gallery_data = Object.assign({}, gallery_exists, {
        items: _.concat(current_gallery_items, [file]),
      });

      const updated_data = await updateGallery({
        galleryDetails: final_gallery_data,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_data,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}
