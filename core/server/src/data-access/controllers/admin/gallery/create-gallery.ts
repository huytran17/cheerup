import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import {
  CreateGallery,
  ICreateGallery,
} from "../../../../use-cases/gallery/create-gallery";

export default function makeCreateGalleryController({
  createGallery,
  logger,
}: {
  createGallery: CreateGallery;
  logger: Logger;
}) {
  return async function createGalleryController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const gallery_details = <ICreateGallery>(
        get(httpRequest, "context.validated", {})
      );

      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const final_gallery_data = {
        ...gallery_details,
        created_by: admin,
      };

      const created_gallery = await createGallery(final_gallery_data);

      logger.verbose(`Created gallery ${created_gallery.name}`);

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_gallery,
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
