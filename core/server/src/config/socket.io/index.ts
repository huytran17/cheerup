import type { Server as HTTPServer } from "http";
import { Http2SecureServer, Http2Server } from "http2";
import type { Server as HTTPSServer } from "https";
import { Server } from "socket.io";
import { initialAdminNsp, initialClientNsp } from "./nsp";

export type TServerInstance =
  | HTTPServer
  | HTTPSServer
  | Http2SecureServer
  | Http2Server;

export default class SocketIO {
  public static socket_instance: SocketIO;
  io_client: Server;

  constructor(http_srv: TServerInstance) {
    if (SocketIO.socket_instance) {
      return SocketIO.socket_instance;
    }

    this.io_client = new Server(http_srv, {
      cors: {
        origin: [
          process.env.USER_DASHBOARD_URL,
          process.env.ADMIN_DASHBOARD_URL,
        ],
        methods: "*",
      },
    });

    initialAdminNsp(this.io_client);
    initialClientNsp(this.io_client);

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
