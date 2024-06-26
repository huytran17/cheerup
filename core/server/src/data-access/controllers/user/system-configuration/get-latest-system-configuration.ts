import { Request } from "express";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetLatestSystemConfiguration } from "../../../../use-cases/system-configuration/get-latest-system-configuration";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetLatestSystemConfigurationController({
  getLatestSystemConfiguration,
}: {
  getLatestSystemConfiguration: GetLatestSystemConfiguration;
}) {
  return async function getLatestSystemConfigurationController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const exists = await getLatestSystemConfiguration();

      if (isEmpty(exists)) {
        throw new Error(`SystemConfiguration does not exists`);
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
