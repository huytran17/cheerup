import { Request } from "express";
import { filter, get } from "lodash";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import { GetGallery } from "../../../../../use-cases/gallery/get-gallery";
import { UpdateGallery } from "../../../../../use-cases/gallery/update-gallery";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import { isEmpty } from "../../../../../utils/is-empty";

interface IPayload {
  _id: string;
  item_id: string;
}

export default function makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
}: {
  getGallery: GetGallery;
  updateGallery: UpdateGallery;
}) {
  return async function deleteGalleryItemController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id, item_id } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getGallery({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Gallery by id ${_id} does not exists`);
      }

      const current_gallery_items = get(exists, "items", []);

      const item_to_delete = current_gallery_items.find(
        (item) => item._id.toString() === item_id
      );

      item_to_delete && deleteUploadedFile(item_to_delete.path);

      const updated_gallery_items = filter(
        current_gallery_items,
        (item) => item._id.toString() !== item_id
      );

      const updated_data = await updateGallery({
        galleryDetails: {
          ...exists,
          items: updated_gallery_items,
        },
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_data,
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
