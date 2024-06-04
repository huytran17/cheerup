import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../../constants/http-status-code";
import { GetLatestSystemConfiguration } from "../../../../../use-cases/system-configuration/get-latest-system-configuration";
import { UpdateSystemConfiguration } from "../../../../../use-cases/system-configuration/update-system-configuraion";
import deleteUploadedFile from "../../../../../utils/delete-uploaded-file";
import getFIleUploadedPath from "../../../../../utils/get-file-uploaded-path";
import { isEmpty } from "../../../../../utils/is-empty";

export default function makeUploadFolderIconController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
}: {
  getLatestSystemConfiguration: GetLatestSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
}) {
  return async function uploadFolderIconController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getLatestSystemConfiguration();

      if (isEmpty(exists)) {
        throw new Error(`System configuration by ${exists._id} does not exist`);
      }

      const file = <IFileMeta>get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      deleteUploadedFile(exists.folder_icon_url);

      const updated_system_configuration = await updateSystemConfiguration({
        ...exists,
        folder_icon: {
          ...file,
          path: getFIleUploadedPath(file.path),
          destination: getFIleUploadedPath(file.destination),
        },
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_system_configuration,
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
