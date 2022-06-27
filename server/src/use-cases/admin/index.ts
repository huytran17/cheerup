import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { AdminDb } from "../../data-access";

import makeGetAdmin from "./get-admin";

const getAdmin = makeGetAdmin({
  adminDb: AdminDb,
  redis,
  logger,
});

const adminServices = Object.freeze({
  getAdmin,
});

export default adminServices;

export { getAdmin };
