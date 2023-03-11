import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IHardDeleteGallery } from "../../../../use-cases/gallery/hard-delete-gallery";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

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

      if (isEmpty(exists)) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const deleted = await hardDeleteGallery({ _id });

      logger.verbose(`Deleted gallery ${_id} successfully`);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted,
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
