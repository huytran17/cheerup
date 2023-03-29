import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IGetGalleriesByParent } from "../../../../use-cases/gallery/get-galleries-by-parent";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetGalleriesByParentController({
  getGallery,
  getGalleriesByParent,
}: {
  getGallery: IGetGallery;
  getGalleriesByParent: IGetGalleriesByParent;
}) {
  return async function getGalleriesByParentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = get(httpRequest, "context.validated");

      const exists = await getGallery({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const galleries = await getGalleriesByParent({ parent_id: _id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: galleries,
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
