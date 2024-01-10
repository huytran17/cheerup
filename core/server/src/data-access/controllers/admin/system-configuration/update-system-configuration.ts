import { GetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import {
  IUpdateSystemConfigurationPayload,
  UpdateSystemConfiguration,
} from "../../../../use-cases/system-configuration/update-system-configuraion";
import { Logger } from "winston";
import { Request } from "express";
import { get, merge } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateSystemConfigurationController({
  getSystemConfiguration,
  updateSystemConfiguration,
  logger,
}: {
  getSystemConfiguration: GetSystemConfiguration;
  updateSystemConfiguration: UpdateSystemConfiguration;
  logger: Logger;
}) {
  return async function updateSystemConfigurationController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const systemConfigurationDetails = <IUpdateSystemConfigurationPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = systemConfigurationDetails;

      const exists = await getSystemConfiguration({ _id });
      if (isEmpty(exists)) {
        throw new Error(`SystemConfiguration by ${_id} does not exist`);
      }

      const final_system_configuration_details = merge(
        {},
        exists,
        systemConfigurationDetails
      );

      const updated_post = await updateSystemConfiguration({
        systemConfigurationDetails: final_system_configuration_details,
      });

      logger.verbose(`Updated system config ${exists._id}`);

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
