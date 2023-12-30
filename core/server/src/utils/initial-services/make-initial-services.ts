import { Transporter } from "nodemailer";
import Redis from "../../config/redis";
import Storage from "../../config/storage";
import TFA from "../../config/tfa";
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
}: {
  connectDb: IMakeConnectDb;
  createDefaultAdmin: DefaultAdmin;
  createDefaultSystemConfiguration: DefaultSystemConfiguration;
  initializeMailer: () => Transporter;
  redis: typeof Redis;
  storage: typeof Storage;
  tfa: typeof TFA;
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
    } catch (error) {
      console.error(error);
      process.exit(7);
    }
  };
}
