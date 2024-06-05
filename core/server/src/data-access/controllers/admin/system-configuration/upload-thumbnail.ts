import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSystemConfiguration,
  IGetSystemConfigurationPayload,
} from "../../../../use-cases/system-configuration/get-system-configuraion";
import { UpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import deleteS3Object from "../../../../utils/delete-s3-object";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadThumbnaiilController({
  getSystemConfiguration,
  updateSystemConfiguration,
}: {
  getSystemConfiguration: GetSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
}) {
  return async function uploadThumbnaiilController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetSystemConfigurationPayload>(
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

      const bucket = <string>get(exists, "thumbnail.bucket", "");
      const key = <string>get(exists, "thumbnail.key", "");

      deleteS3Object({ bucket, key });

      const system_configuration_details = {
        ...exists,
        thumbnail: file,
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
