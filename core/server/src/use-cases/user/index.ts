import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { UserDb } from "../../data-access";
import makeBatchUploadUsers from "./batch-upload-users";
import makeCreateUser from "./create-user";
import makeDeleteUser from "./delete-user";
import makeGetOneUser from "./get-one-user";
import makeGetSoftDeletedUser from "./get-soft-deleted-user";
import makeGetUser from "./get-user";
import makeGetUserAnalystics from "./get-user-analystics";
import makeGetUserByEmail from "./get-user-by-email";
import makeGetUserTfaSecretByEmail from "./get-user-tfa-secret-by-email";
import makeGetUsers from "./get-users";
import makeGetUsersPaginated from "./get-users-paginated";
import makeHardDeleteUser from "./hard-delete-user";
import makeIncreaseLoginFailedTimes from "./increase-login-failed-times";
import makeResetLoginFailedTimes from "./reset-login-failed-times";
import makeRestoreUser from "./restore-user";
import makeUpdateUser from "./update-user";

const getUsersPaginated = makeGetUsersPaginated({
  userDb: UserDb,
  randomCacheTime,
  redis,
  logger,
});

const batchUploadUsers = makeBatchUploadUsers({
  userDb: UserDb,
});

const increaseLoginFailedTimes = makeIncreaseLoginFailedTimes({
  userDb: UserDb,
});

const resetLoginFailedTimes = makeResetLoginFailedTimes({
  userDb: UserDb,
});

const getSoftDeletedUser = makeGetSoftDeletedUser({
  userDb: UserDb,
});

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
  randomCacheTime,
  redis,
  logger,
});

const hardDeleteUser = makeHardDeleteUser({
  userDb: UserDb,
});

const getUsers = makeGetUsers({
  userDb: UserDb,
  randomCacheTime,
  redis,
  logger,
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
  getSoftDeletedUser,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
  batchUploadUsers,
  getUsersPaginated,
});

export default userServices;

export {
  batchUploadUsers,
  createUser,
  deleteUser,
  getOneUser,
  getSoftDeletedUser,
  getUser,
  getUserAnalystics,
  getUserByEmail,
  getUserTfaSecretByEmail,
  getUsers,
  getUsersPaginated,
  hardDeleteUser,
  increaseLoginFailedTimes,
  resetLoginFailedTimes,
  restoreUser,
  updateUser,
};
