import { logger } from "../../config/storage/logger";

import { UserDb } from "../../data-access";

import makeGetUser from "./get-user";
import makeGetUserByEmail from "./get-user-by-email";
import makeDeleteUser from "./delete-user";
import makeUpdateUser from "./update-user";
import makeGetUsers from "./get-users";
import makeHardDeleteUser from "./hard-delete-user";

const hardDeleteUser = makeHardDeleteUser({
  userDb: UserDb,
});

const getUsers = makeGetUsers({
  userDb: UserDb,
  logger,
});

const getUser = makeGetUser({
  userDb: UserDb,
  logger,
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
});

export default userServices;

export {
  getUser,
  getUserByEmail,
  deleteUser,
  updateUser,
  getUsers,
  hardDeleteUser,
};
