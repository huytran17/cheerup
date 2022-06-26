import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { UserDb } from "../../data-access";

import makeGetUser from "./get-user";

const getUser = makeGetUser({
  userDb: UserDb,
  redis,
  logger,
});

const userServices = Object.freeze({
  getUser,
});

export default userServices;

export { getUser };
