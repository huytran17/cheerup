import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IHardDeleteGallery } from "../../../../use-cases/gallery/hard-delete-gallery";
import _ from "lodash";
import { Logger } from "winston";

export default function makeHardDeleteGalleryController({
  getGallery,
  hardDeleteGallery,
  logger,
}: {
  getGallery: IGetGallery;
  hardDeleteGallery: IHardDeleteGallery;
  logger: Logger;
}) {
  return async function hardDeleteGalleryController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getGallery({ _id });

      const not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (not_exists) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const items = _.get(exists, "items", []);

      for (const item of items) {
        const s3_params = {
          Bucket: item.bucket,
          Key: item.key,
        };

        Storage.deleteS3Object(s3_params);
      }

      logger.verbose(`Deleted all items from gallery ${_id}`);

      const galleriesByParent = await getGalleriesByParent({
        parent_id: _id,
      });

      const deleteChildrenPromises = galleriesByParent.map(
        async (gallery) => await hardDeleteGallery({ _id: gallery._id })
      );

      logger.verbose(`Deleted all children from gallery ${this._id}`);

      await Promise.all(deleteChildrenPromises);

      const deleted = await hardDeleteGallery({ _id });

      logger.verbose(`Deleted gallery ${_id} successfully`);

      return {
        headers,
        statusCode: 200,
        body: {
          data: deleted,
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
