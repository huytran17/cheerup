import { Transporter } from "nodemailer";
import Redis from "../../config/redis";
import SocketIO, { TServerInstance } from "../../config/socket.io";
import Storage from "../../config/storage";
import TFA from "../../config/tfa";
import { IMakeConnectDb } from "../../data-access/make-connect-db";
import { DefaultAdmin } from "../initial-data/make-default-admin";
import { DefaultSystemConfiguration } from "../initial-data/make-default-system-configuration";

export type InitializeServices = (http_server: TServerInstance) => void;

export default function makeInitialServices({
  connectDb,
  createDefaultAdmin,
  createDefaultSystemConfiguration,
  initializeMailer,
  redis,
  storage,
  tfa,
  socketIO,
}: {
  connectDb: IMakeConnectDb;
  createDefaultAdmin: DefaultAdmin;
  createDefaultSystemConfiguration: DefaultSystemConfiguration;
  initializeMailer: () => Transporter;
  redis: typeof Redis;
  storage: typeof Storage;
  tfa: typeof TFA;
  socketIO: typeof SocketIO;
}): InitializeServices {
  return function initializeServices(http_server) {
    try {
      connectDb().then(() =>
        Promise.all([createDefaultAdmin(), createDefaultSystemConfiguration()])
      );

      initializeMailer();
      // new storage();
      new redis();
      new tfa();
      new socketIO(http_server);
    } catch (error) {
      console.error(error);
      process.exit(7);
    }
  };
}
