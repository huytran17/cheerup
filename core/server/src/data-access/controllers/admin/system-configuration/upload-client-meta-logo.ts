import { Request } from "express";
import { get } from "lodash";
import { IGetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuration";
import { IUpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import Storage from "../../../../config/storage";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadClientMetaLogoController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
}: {
  getLatestSystemConfiguration: IGetLatestSystemConfiguration;
  updateSystemConfiguration: IUpdateSystemConfiguration;
}) {
  return async function uploadClientMetaLogoController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getLatestSystemConfiguration();

      if (isEmpty(exists)) {
        throw new Error(`System configuration by ${exists._id} does not exist`);
      }

      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = get(exists, "client_meta.logo.bucket", "");
      const current_key = get(exists, "client_meta.logo.key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        Storage.deleteS3Object(s3_params);
      }

      const system_configuration_details = Object.assign({}, exists, {
        client_meta: {
          ...exists.client_meta,
          logo: file,
        },
      });

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
