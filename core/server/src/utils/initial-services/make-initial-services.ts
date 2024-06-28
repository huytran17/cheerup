import { Transporter } from "nodemailer";
import Redis from "../../config/redis";
import SocketIO, { ISocketDependencies } from "../../config/socket.io";
import Storage from "../../config/storage";
import TFA from "../../config/tfa";
import { IMakeConnectDb } from "../../data-access/make-connect-db";
import { DefaultAdmin } from "../initial-data/make-default-admin";
import { DefaultSystemConfiguration } from "../initial-data/make-default-system-configuration";

export type InitializeServices = ({
  http_srv,
  helmet,
  cookieParser,
  compression,
}: ISocketDependencies) => void;

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
  return function initializeServices({
    compression,
    cookieParser,
    helmet,
    http_srv,
  }) {
    try {
      connectDb().then(() =>
        Promise.all([createDefaultAdmin(), createDefaultSystemConfiguration()])
      );

      initializeMailer();
      // storage.getS3();
      redis.getInstance();
      tfa.getInstance();
      socketIO
        .getInstance()
        .makeSocketIO({ compression, cookieParser, helmet, http_srv });
    } catch (error) {
      console.error(error);
      process.exit(7);
    }
  };
}
