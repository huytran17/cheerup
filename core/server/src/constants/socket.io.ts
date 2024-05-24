const SocketIONsp = {
  ADMIN: "/admin",
  CLIENT: "/client",
};

const SocketEvents = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

enum ClientEvents {
  ONLINE = "online",
}

enum ServerEvents {
  OFFLINE = "offline",
}

export default Object.freeze({
  SocketIONsp,
  SocketEvents,
  ClientEvents,
  ServerEvents,
});

export { SocketIONsp, SocketEvents, ClientEvents, ServerEvents };
