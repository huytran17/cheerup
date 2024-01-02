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
import makeUpdateSystemConfiguration from "../../../../use-cases/system-configuration/update-system-configuraion";
import makeGetSystemConfiguration from "../../../../use-cases/system-configuration/get-system-configuraion";
import makeUpdateSystemConfigurationController from "./update-system-configuration";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import ISystemConfiguration from "../../../../database/interfaces/system-configuration";

describe("updateSystemConfiguration", () => {
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
    const updateSystemConfiguration = makeUpdateSystemConfiguration({
      systemConfigurationDb,
    });

    const mock_system_configuration_data = fakeSystemConfiguration();

    const created_system_configuration = await createSystemConfiguration({
      systemConfigurationDetails: mock_system_configuration_data,
    });

    const updateSystemConfigurationController =
      makeUpdateSystemConfigurationController({
        getSystemConfiguration,
        updateSystemConfiguration,
        logger,
      });

    const request = {
      context: {
        validated: created_system_configuration,
      },
    };

    const result = await updateSystemConfigurationController(request as any);

    const expected: ExpectSingleResult<ISystemConfiguration> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
