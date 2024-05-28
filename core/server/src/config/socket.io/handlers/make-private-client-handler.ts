import { Server } from "socket.io";
import {
  ClientEvents,
  ServerEvents,
  SocketEvents,
} from "../../../constants/socket.io";
import IUserDb from "../../../data-access/interfaces/user-db";
import { InitialAdminNsp } from "../nsp/admin";
import { IUserPayload, InitialClientNsp } from "../nsp/client";

export default function makePrivateClientHandler({
  userDb,
  initialClientNsp,
  initialAdminNsp,
}: {
  userDb: IUserDb;
  initialClientNsp: InitialClientNsp;
  initialAdminNsp: InitialAdminNsp;
}) {
  return function privateClientHandler({ io }: { io: Server }) {
    const online_users = {};

    const client_nsp = initialClientNsp({ io });
    const admin_nsp = initialAdminNsp({ io });

    client_nsp.on(SocketEvents.CONNECT, (socket) => {
      socket.on(ClientEvents.ONLINE, async ({ user_id }: IUserPayload) => {
        const user_ids = Array.from(new Set(Object.values(online_users)));
        if (!user_ids.includes(user_id)) {
          await userDb.update({
            _id: user_id,
            is_online: true,
          });
        }

        online_users[socket.id] = user_id;
        admin_nsp.emit(ServerEvents.ONLINE, { user_id });
      });

      socket.on(SocketEvents.DISCONNECT, async () => {
        const user_id = online_users[socket.id];

        delete online_users[socket.id];

        const user_ids = Array.from(new Set(Object.values(online_users)));

        const is_user_still_online = user_ids.includes(user_id);
        if (is_user_still_online) {
          return;
        }

        admin_nsp.emit(ServerEvents.OFFLINE, { user_id });

        await userDb.update({
          _id: user_id,
          last_online_at: new Date(),
          is_online: false,
        });
      });
    });
  };
}
