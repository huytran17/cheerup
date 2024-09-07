import { Request } from "express";
import { get } from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import {
  IUpdateSystemConfiguration,
  UpdateSystemConfiguration,
} from "../../../../use-cases/system-configuration/update-system-configuraion";
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
      const system_configuration_details = <IUpdateSystemConfiguration>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = system_configuration_details;

      const exists = await getSystemConfiguration({ _id });
      if (isEmpty(exists)) {
        throw new Error(`SystemConfiguration by ${_id} does not exist`);
      }

      const final_system_configuration_details = {
        ...exists,
        ...system_configuration_details,
      };

      const updated_post = await updateSystemConfiguration(
        final_system_configuration_details
      );

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
