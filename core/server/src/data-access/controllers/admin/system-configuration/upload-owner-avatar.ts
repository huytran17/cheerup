import { Request } from "express";
import { get } from "lodash";
import { GetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuration";
import { UpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

export default function makeUploadOwnerAvatarController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
}: {
  getLatestSystemConfiguration: GetLatestSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
}) {
  return async function uploadClientAvatarController(
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

      const file = get(httpRequest, "context.file", {});

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "owner.avatar.bucket", "");
      const key = <string>get(exists, "owner.avatar.key", "");

      deleteS3Object({ bucket, key });

      const system_configuration_details = {
        ...exists,
        owner: {
          ...exists?.owner,
          avatar: file,
        },
      };

      const updated_system_configuration = await updateSystemConfiguration({
        systemConfigurationDetails: system_configuration_details,
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
