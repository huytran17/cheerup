import { IGetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import { IUpdateSystemConfiguration } from "../../../../use-cases/system-configuration/update-system-configuraion";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeUpdateSystemConfigurationController({
  getSystemConfiguration,
  updateSystemConfiguration,
  logger,
}: {
  getSystemConfiguration: IGetSystemConfiguration;
  updateSystemConfiguration: IUpdateSystemConfiguration;
  logger: Logger;
}) {
  return async function updateSystemConfigurationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const systemConfigurationDetails = _.get(
        httpRequest,
        "context.validated"
      );
      const { _id } = systemConfigurationDetails;
      const exists = await getSystemConfiguration({ _id });
      if (!exists) {
        throw new Error(`SystemConfiguration by ${_id} does not exist`);
      }

      const final_system_configuration_details = Object.assign(
        {},
        exists,
        systemConfigurationDetails
      );

      const updated_post = await updateSystemConfiguration({
        systemConfigurationDetails: final_system_configuration_details,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_post,
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
