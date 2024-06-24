import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetGallery,
  IGetGalleryPayload,
} from "../../../../use-cases/gallery/get-gallery";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetGalleryController({
  getGallery,
}: {
  getGallery: GetGallery;
}) {
  return async function getGalleryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetGalleryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getGallery({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Gallery by id ${_id} does not exists`);
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
