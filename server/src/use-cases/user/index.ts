import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { UserDb } from "../../data-access";

import makeGetUser from "./get-user";
import makeGetUserByEmail from "./get-user-by-email";

const getUser = makeGetUser({
  userDb: UserDb,
  redis,
  logger,
});

const getUserByEmail = makeGetUserByEmail({
  userDb: UserDb,
});

const userServices = Object.freeze({
  getUser,
  getUserByEmail,
});

export default userServices;

export { getUser, getUserByEmail };
