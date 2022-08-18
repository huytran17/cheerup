import { Request } from "express";
import * as _ from "lodash";
import { IGetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuraion";
import { IUpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";

export default function makeUploadAdminMetaFaviconController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
}: {
  getLatestSystemConfiguration: IGetLatestSystemConfiguration;
  updateSystemConfiguration: IUpdateSystemConfiguration;
}) {
  return async function uploadAdminMetaFaviconController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getLatestSystemConfiguration();
      if (!exists) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `Category does not exists.`,
          },
        };
      }

      const file = _.get(httpRequest, "context.file");
      if (!file) {
        return {
          headers,
          statusCode: 200,
          body: {
            is_error: true,
            message: `File does not exists.`,
          },
        };
      }

      const aws_payload = {
        mime_type: file.mimetype,
        dirname: file.key,
        size: file.size,
        name: file.originalname,
        meta: {
          bucket: file.bucket,
          acl: file.bucket,
          ...file,
        },
      };

      const system_configuration_details = Object.assign({}, exists, {
        admin_meta: {
          ...exists.admin_meta,
          favicon: aws_payload,
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
    } catch (err) {
      // TODO: add in error handling here
      // TODO: revert the file upload that was done
      // await session.abortTransaction();
      console.error(err);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}
