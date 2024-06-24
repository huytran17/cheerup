import { fakeSystemConfiguration } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISystemConfiguration from "../../../../database/interfaces/system-configuration";
import makeCreateSystemConfiguration from "../../../../use-cases/system-configuration/create-system-configuration";
import makeGetSystemConfiguration from "../../../../use-cases/system-configuration/get-system-configuraion";
import makeSystemConfigurationDb from "../../../make-system-configuration-db";
import { SystemConfigurationModel } from "../../../models";
import makeGetSystemConfigurationController from "./get-system-configuration";

describe("getSystemConfiguration", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an system configuration entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const systemConfigurationDb = makeSystemConfigurationDb({
      systemConfigurationDbModel: SystemConfigurationModel,
    });

    const createSystemConfiguration = makeCreateSystemConfiguration({
      systemConfigurationDb,
    });
    const getSystemConfiguration = makeGetSystemConfiguration({
      systemConfigurationDb,
    });

    const mock_system_configuration_data = fakeSystemConfiguration();

    const created_system_configuration = await createSystemConfiguration(
      mock_system_configuration_data
    );

    const getSystemConfigurationController =
      makeGetSystemConfigurationController({
        getSystemConfiguration,
      });

    const request = {
      context: {
        validated: created_system_configuration,
      },
    };

    const result = await getSystemConfigurationController(request as any);

    const expected: ExpectSingleResult<ISystemConfiguration> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
