import { initializeMailer } from "../../config/emailManager/mailer";
import Redis from "../../config/redis";
import Storage from "../../config/storage";
import TFA from "../../config/tfa";
import DynamicPool from "../../config/worker-threads-pool/dynamic-pool";
import { connectDb } from "../../data-access";
import {
  createDefaultAdmin,
  createDefaultSystemConfiguration,
} from "../initial-data";
import makeInitialServices from "./make-initial-services";

const initialServices = makeInitialServices({
  connectDb,
  createDefaultAdmin,
  createDefaultSystemConfiguration,
  initializeMailer,
  redis: Redis,
  storage: Storage,
  tfa: TFA,
  dynamicWorkerPool: DynamicPool,
});

export { initialServices };
