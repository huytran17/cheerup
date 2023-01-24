import { Request } from "express";
import { IGetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetSystemConfigurationController({
  getSystemConfiguration,
  logger,
}: {
  getSystemConfiguration: IGetSystemConfiguration;
  logger: Logger;
}) {
  return async function getSystemConfigurationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { post_id } = _.get(httpRequest, "context.validated");
      const exists = await getSystemConfiguration({ _id: post_id });
      if (!exists) {
        throw new Error(`SystemConfiguration ${post_id} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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
