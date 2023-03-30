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
import makeCreateSystemConfiguration from "../../../../use-cases/system-configuration/create-system-configuration";
import makeGetSystemConfiguration from "../../../../use-cases/system-configuration/get-system-configuraion";
import makeGetSystemConfigurationController from "./get-system-configuration";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import SystemConfiguration from "../../../../database/entities/system-configuration";

describe("getSystemConfiguration", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("should return a body that contains an system configuration entity", async () => {
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
    const getSystemConfiguration = makeGetSystemConfiguration({
      systemConfigurationDb,
      logger,
    });

    const mock_system_configuration_data = fakeSystemConfiguration();

    const created_system_configuration = await createSystemConfiguration({
      systemConfigurationDetails: mock_system_configuration_data,
    });

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

    const expected: ExpectSingleResult<SystemConfiguration> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
