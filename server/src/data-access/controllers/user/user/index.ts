import { getUser, deleteUser, updateUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/storage/logger";

import makeGetUserController from "./get-user";
import makeDeleteUser from "./delete-user";
import makeUpdateUser from "./update-user";

const getUserController = makeGetUserController({
  getUser,
  logger,
});

const deleteUserController = makeDeleteUser({
  getUser,
  deleteUser,
  logger,
});

const updateUserController = makeUpdateUser({
  getUser,
  updateUser,
  logger,
});

export default Object.freeze({
  getUserController,
  deleteUserController,
  updateUserController,
});

export { getUserController, deleteUserController, updateUserController };
