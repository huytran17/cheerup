import type { Server as HTTPServer } from "http";
import { Http2SecureServer, Http2Server } from "http2";
import type { Server as HTTPSServer } from "https";
import { Server } from "socket.io";
import { Compression, CookieParser, Helmet } from "../../app";
import { privateClientHandler, privateAdminHandler } from "./handlers";

export type TServerInstance =
  | HTTPServer
  | HTTPSServer
  | Http2SecureServer
  | Http2Server;

export default class SocketIO {
  public static socket_instance: SocketIO;
  io_client: Server;

  constructor({
    http_srv,
    helmet,
    compression,
    cookieParser,
  }: {
    http_srv: TServerInstance;
    helmet: Helmet;
    compression: Compression;
    cookieParser: CookieParser;
  }) {
    if (SocketIO.socket_instance) {
      return SocketIO.socket_instance;
    }

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

    SocketIO.socket_instance = this;

    console.log("Socket.io server initialized");
  }

  static getInstance() {
    if (SocketIO.socket_instance) {
      return SocketIO.socket_instance;
    }
  }
}

const socket = SocketIO.getInstance();

export { socket };
