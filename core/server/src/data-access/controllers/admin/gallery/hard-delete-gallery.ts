import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetGallery } from "../../../../use-cases/gallery/get-gallery";
import {
  HardDeleteGallery,
  IHardDeleteGallery,
} from "../../../../use-cases/gallery/hard-delete-gallery";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHardDeleteGalleryController({
  getGallery,
  hardDeleteGallery,
  logger,
}: {
  getGallery: GetGallery;
  hardDeleteGallery: HardDeleteGallery;
  logger: Logger;
}) {
  return async function hardDeleteGalleryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeleteGallery>(
        get(httpRequest, "context.validated", {})
      );
      const exists = await getGallery({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const deleted = await hardDeleteGallery({ _id });

      logger.verbose(`Deleted gallery ${exists.name} successfully`);

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
