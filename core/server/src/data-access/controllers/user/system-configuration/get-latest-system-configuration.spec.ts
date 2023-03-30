import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakeSystemConfiguration } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeSystemConfigurationDb from "../../../make-system-configuration-db";
import { SystemConfigurationModel } from "../../../models";
import makeGetLatestSystemConfiguration from "../../../../use-cases/system-configuration/get-latest-system-configuration";
import makeCreateSystemConfiguration from "../../../../use-cases/system-configuration/create-system-configuration";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import SystemConfiguration from "../../../../database/entities/system-configuration";

describe("getLatestSystemConfiguration", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains a subscription entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const systemConfigurationDb = makeSystemConfigurationDb({
      systemConfigurationDbModel: SystemConfigurationModel,
      moment,
    });

    const createSystemConfiguration = makeCreateSystemConfiguration({
      systemConfigurationDb,
    });
    const getLatestSystemConfiguration = makeGetLatestSystemConfiguration({
      systemConfigurationDb,
      logger,
    });

    const mock_system_configuration_data = fakeSystemConfiguration();

    await createSystemConfiguration({
      systemConfigurationDetails: mock_system_configuration_data,
    });

    const getLatestSystemConfigurationController =
      makeGetLatestSystemConfigurationController({
        getLatestSystemConfiguration,
      });

    const request = {};

    const result = await getLatestSystemConfigurationController(request as any);

    const expected: ExpectSingleResult<SystemConfiguration> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
