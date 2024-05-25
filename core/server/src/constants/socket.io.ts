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

export default Object.freeze({
  SocketIONsp,
  SocketEvents,
  ClientEvents,
});

export { SocketIONsp, SocketEvents, ClientEvents };
