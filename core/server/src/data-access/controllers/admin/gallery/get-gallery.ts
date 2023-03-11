import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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

      if (isEmpty(exists)) {
        throw new Error(`Post by id ${exists} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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
