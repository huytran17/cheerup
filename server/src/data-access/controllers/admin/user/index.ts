import moment from "moment";

import { getUser } from "../../../../use-cases/user";

import makeGetUserController from "./get-user";

const getUserController = makeGetUserController({ getUser });

export default Object.freeze({
  getUserController,
});

export { getUserController };
