const SocketIONsp = {
  PRIVATE_ADMIN: "/private-admin",
  PRIVATE_CLIENT: "/private-client",
};

const SocketEvents = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

enum ClientEvents {
  ONLINE = "online",
}

enum ServerEvents {
  ONLINE = "online",
  OFFLINE = "offline",
}

export { SocketIONsp, SocketEvents, ClientEvents, ServerEvents };
