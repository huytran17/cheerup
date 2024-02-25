import { logger } from "../../config/logs/logger";
import { redis } from "../../config/redis";

import { UserDb } from "../../data-access";

import makeGetUser from "./get-user";
import makeGetUserByEmail from "./get-user-by-email";
import makeDeleteUser from "./delete-user";
import makeUpdateUser from "./update-user";
import makeGetUsers from "./get-users";
import makeHardDeleteUser from "./hard-delete-user";
import makeGetUserAnalystics from "./get-user-analystics";
import makeCreateUser from "./create-user";
import makeGetOneUser from "./get-one-user";
import makeRestoreUser from "./restore-user";
import makeGetUserTfaSecretByEmail from "./get-user-tfa-secret-by-email";

const getUserTfaSecretByEmail = makeGetUserTfaSecretByEmail({
  userDb: UserDb,
});

const restoreUser = makeRestoreUser({
  userDb: UserDb,
});

const getOneUser = makeGetOneUser({
  userDb: UserDb,
});

const createUser = makeCreateUser({
  userDb: UserDb,
});

const getUserAnalystics = makeGetUserAnalystics({
  userDb: UserDb,
  redis,
  logger,
});

const hardDeleteUser = makeHardDeleteUser({
  userDb: UserDb,
});

const getUsers = makeGetUsers({
  userDb: UserDb,
});

const getUser = makeGetUser({
  userDb: UserDb,
});

const getUserByEmail = makeGetUserByEmail({
  userDb: UserDb,
});

const deleteUser = makeDeleteUser({
  userDb: UserDb,
});

const updateUser = makeUpdateUser({
  userDb: UserDb,
});

const userServices = Object.freeze({
  getUser,
  getUserByEmail,
  deleteUser,
  updateUser,
  getUsers,
  hardDeleteUser,
  getUserAnalystics,
  createUser,
  getOneUser,
  restoreUser,
  getUserTfaSecretByEmail,
});

export default userServices;

export {
  getUser,
  getUserByEmail,
  deleteUser,
  updateUser,
  getUsers,
  hardDeleteUser,
  getUserAnalystics,
  createUser,
  getOneUser,
  restoreUser,
  getUserTfaSecretByEmail,
};
