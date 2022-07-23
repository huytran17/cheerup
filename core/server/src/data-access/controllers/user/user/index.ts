import { getUser, deleteUser, updateUser } from "../../../../use-cases/user";
import { logger } from "../../../../config/storage/logger";

import makeGetUserController from "./get-user";
import makeDeleteUserController from "./delete-user";
import makeUpdateUserController from "./update-user";

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
});

export { getUserController, deleteUserController, updateUserController };
