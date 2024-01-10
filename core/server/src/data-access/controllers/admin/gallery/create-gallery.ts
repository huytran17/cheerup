import {
  CreateGallery,
  ICreateGalleryPayload,
} from "../../../../use-cases/gallery/create-gallery";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";

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
      const galleryDetails = <ICreateGalleryPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { _id: admin_id } = <IAdmin>get(httpRequest, "context.user", {});

      const final_gallery_data = merge({}, galleryDetails, {
        created_by: admin_id,
      });

      const created_gallery = await createGallery({
        galleryDetails: final_gallery_data,
      });

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
