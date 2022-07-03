import {
  getUser,
  deleteUser,
  updateUser,
  getUsers,
  getUserByEmail,
} from "../../../../use-cases/user";
import { logger } from "../../../../config/storage/logger";
import { signUp } from "../../../../use-cases/auth";
import { hashPassword } from "../../../../config/password";

import makeGetUserController from "./get-user";
import makeDeleteUserController from "./delete-user";
import makeUpdateUserController from "./update-user";
import makeCreateUserController from "./create-user";
import makeGetUserByEmailController from "./get-user-by-email";
import makeGetUsersController from "./get-users";

const createUserController = makeCreateUserController({
  signUp,
  getUserByEmail,
  hashPassword,
  logger,
});

const getUserByEmailController = makeGetUserByEmailController({
  getUserByEmail,
  logger,
});

const getUsersController = makeGetUsersController({
  getUsers,
  logger,
});

const getUserController = makeGetUserController({
  getUser,
  logger,
});

const deleteUserController = makeDeleteUserController({
  getUser,
  deleteUser,
  logger,
});

const updateUserController = makeUpdateUserController({
  getUser,
  updateUser,
  logger,
});

export default Object.freeze({
  getUserController,
  deleteUserController,
  updateUserController,
  getUserByEmailController,
  getUsersController,
  createUserController,
});

export {
  getUserController,
  deleteUserController,
  updateUserController,
  getUserByEmailController,
  getUsersController,
  createUserController,
};
