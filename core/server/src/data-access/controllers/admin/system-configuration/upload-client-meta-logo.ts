import { Request } from "express";
import * as _ from "lodash";
import { IGetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuraion";
import { IUpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import Storage from "../../../../config/storage";

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
      const system_configuration_not_exists =
        _.isEmpty(exists) || _.isNil(exists);

      if (system_configuration_not_exists) {
        throw new Error(`System configuration by ${exists._id} does not exist`);
      }

      const file = _.get(httpRequest, "context.file");
      const file_not_exists = _.isEmpty(file) || _.isNil(file);
      if (file_not_exists) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = _.get(exists, "client_meta.logo.bucket", "");
      const current_key = _.get(exists, "client_meta.logo.key", "");

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
        statusCode: 200,
        body: {
          data: updated_system_configuration,
        }, // TODO: add in implementation of resource
      };
    } catch (error) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(error);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: error.message,
        },
      };
    }
  };
}
