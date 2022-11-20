import { Request } from "express";
import { IGetGallery } from "../../../../use-cases/gallery/get-gallery";
import { IGetGalleriesByParent } from "../../../../use-cases/gallery/get-galleries-by-parent";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetGalleriesByParentController({
  getGallery,
  getGalleriesByParent,
  logger,
}: {
  getGallery: IGetGallery;
  getGalleriesByParent: IGetGalleriesByParent;
  logger: Logger;
}) {
  return async function getGalleriesByParentController(
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

      const galleries = await getGalleriesByParent({ parent_id: _id });

      return {
        headers,
        statusCode: 200,
        body: {
          data: galleries,
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
