import { Request } from "express";
import { IGetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import _ from "lodash";
import { Logger } from "winston";

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
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}
