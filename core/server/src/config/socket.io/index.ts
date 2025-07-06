import type { Server as HTTPServer } from "http";
import { Http2SecureServer, Http2Server } from "http2";
import type { Server as HTTPSServer } from "https";
import { Server } from "socket.io";
import { Compression, CookieParser, Helmet } from "../../app";
import { privateAdminHandler, privateClientHandler } from "./handlers";

export type TServerInstance =
  | HTTPServer
  | HTTPSServer
  | Http2SecureServer
  | Http2Server;

export interface ISocketDependencies {
  http_srv: TServerInstance;
  helmet: Helmet;
  compression: Compression;
  cookieParser: CookieParser;
}

export default class SocketIO {
  private static socket_instance: SocketIO;
  io_client: Server;

  private constructor() {
    console.log("Initializing Socket IO...");
  }

  makeSocketIO({
    compression,
    cookieParser,
    helmet,
    http_srv,
  }: ISocketDependencies) {
    this.io_client = new Server(http_srv, {
      cors: {
        origin: [
          process.env.USER_DASHBOARD_URL,
          process.env.ADMIN_DASHBOARD_URL,
        ],
        credentials: true,
        methods: "*",
      },
    });

    this.io_client.engine.use(compression());
    this.io_client.engine.use(helmet());
    this.io_client.engine.use(cookieParser());

    privateClientHandler({ io: this.io_client });
    privateAdminHandler({ io: this.io_client });

    console.log("Socket.io server initialized");
  }

  static getInstance() {
    if (!SocketIO.socket_instance) {
      SocketIO.socket_instance = new SocketIO();
    }

    return SocketIO.socket_instance;
  }
}
