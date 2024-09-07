import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSystemConfiguration,
  IGetSystemConfiguration,
} from "../../../../use-cases/system-configuration/get-system-configuraion";
import { UpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import deleteS3Object from "../../../../utils/delete-s3-object";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadFolderIconController({
  getSystemConfiguration,
  updateSystemConfiguration,
}: {
  getSystemConfiguration: GetSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
}) {
  return async function uploadFolderIconController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSystemConfiguration>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getSystemConfiguration({ _id });

      if (isEmpty(exists)) {
        throw new Error(`System configuration by ${exists._id} does not exist`);
      }

      const file = get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "folder_icon.bucket", "");
      const key = <string>get(exists, "folder_icon.key", "");

      deleteS3Object({ bucket, key });

      const system_configuration_details = {
        ...exists,
        folder_icon: file,
      };

      const updated_system_configuration = await updateSystemConfiguration(
        system_configuration_details
      );

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
