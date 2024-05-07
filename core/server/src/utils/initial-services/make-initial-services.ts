import { Transporter } from "nodemailer";
import Redis from "../../config/redis";
import Storage from "../../config/storage";
import TFA from "../../config/tfa";
import DynamicPool from "../../config/worker-threads-pool/dynamic-pool";
import { IMakeConnectDb } from "../../data-access/make-connect-db";
import { DefaultAdmin } from "../initial-data/make-default-admin";
import { DefaultSystemConfiguration } from "../initial-data/make-default-system-configuration";

export type InitializeServices = () => Promise<void>;

export default function makeInitialServices({
  connectDb,
  createDefaultAdmin,
  createDefaultSystemConfiguration,
  initializeMailer,
  redis,
  storage,
  tfa,
  dynamicWorkerPool,
}: {
  connectDb: IMakeConnectDb;
  createDefaultAdmin: DefaultAdmin;
  createDefaultSystemConfiguration: DefaultSystemConfiguration;
  initializeMailer: () => Transporter;
  redis: typeof Redis;
  storage: typeof Storage;
  tfa: typeof TFA;
  dynamicWorkerPool: typeof DynamicPool;
}): InitializeServices {
  return async function initializeServices() {
    try {
      connectDb().then(() =>
        Promise.all([createDefaultAdmin(), createDefaultSystemConfiguration()])
      );

      initializeMailer();
      new storage();
      new redis();
      new tfa();
      new dynamicWorkerPool();
    } catch (error) {
      console.error(error);
      process.exit(7);
    }
  };
}
