import { Request } from "express";
import { IGetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuraion";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetLatestSystemConfigurationController({
  getLatestSystemConfiguration,
  logger,
}: {
  getLatestSystemConfiguration: IGetLatestSystemConfiguration;
  logger: Logger;
}) {
  return async function getLatestSystemConfigurationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getLatestSystemConfiguration();
      if (!exists) {
        throw new Error(`SystemConfiguration does not exists`);
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error.message,
        },
      };
    }
  };
}
