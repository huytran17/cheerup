import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetGalleryController({
  getGallery,
  logger,
}: {
  getGallery: IGetGallery;
  logger: Logger;
}) {
  return async function getGalleryController(
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
        throw new Error(`Post by id ${exists} does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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
