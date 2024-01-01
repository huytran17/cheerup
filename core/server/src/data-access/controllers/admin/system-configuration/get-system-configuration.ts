import { Request } from "express";
import { GetSystemConfiguration } from "../../../../use-cases/system-configuration/get-system-configuraion";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetSystemConfigurationController({
  getSystemConfiguration,
}: {
  getSystemConfiguration: GetSystemConfiguration;
}) {
  return async function getSystemConfigurationController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getSystemConfiguration({ _id });
      if (isEmpty(exists)) {
        throw new Error(`SystemConfiguration ${_id} does not exists`);
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
