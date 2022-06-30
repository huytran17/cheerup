import { getUser, getUserById, deleteUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/storage/logger";

import makeGetUserController from "./get-user";
import makeDeleteUser from "./delete-user";
import makeUpdateUser from "./update-user";

const getUserController = makeGetUserController({
  getUser,
  logger,
});

const deleteUserController = makeDeleteUser({
  getUserById,
  deleteUser,
  logger,
});

const updateUserController = makeUpdateUser({
  getUserById,
  updateUser,
  logger,
});

export default Object.freeze({
  getUserController,
  deleteUserController,
  updateUserController,
});

export { getUserController, deleteUserController, updateUserController };
