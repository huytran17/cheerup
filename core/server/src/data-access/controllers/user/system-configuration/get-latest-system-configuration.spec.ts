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
import makeGetLatestSystemConfiguration from "../../../../use-cases/system-configuration/get-latest-system-configuration";
import makeSystemConfigurationDb from "../../../make-system-configuration-db";
import { SystemConfigurationModel } from "../../../models";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";

describe("getLatestSystemConfiguration", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a subscription entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const systemConfigurationDb = makeSystemConfigurationDb({
      systemConfigurationDbModel: SystemConfigurationModel,
    });

    const createSystemConfiguration = makeCreateSystemConfiguration({
      systemConfigurationDb,
    });
    const getLatestSystemConfiguration = makeGetLatestSystemConfiguration({
      systemConfigurationDb,
    });

    const mock_system_configuration_data = fakeSystemConfiguration();

    await createSystemConfiguration(mock_system_configuration_data);

    const getLatestSystemConfigurationController =
      makeGetLatestSystemConfigurationController({
        getLatestSystemConfiguration,
      });

    const request = {};

    const result = await getLatestSystemConfigurationController(request as any);

    const expected: ExpectSingleResult<ISystemConfiguration> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
