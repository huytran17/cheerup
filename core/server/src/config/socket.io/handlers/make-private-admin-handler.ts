import { Server } from "socket.io";
import {
  ClientEvents,
  ServerEvents,
  SocketEvents,
} from "../../../constants/socket.io";
import IAdminDb from "../../../data-access/interfaces/admin-db";
import { IUserPayload, InitialAdminNsp } from "../nsp/admin";

export default function makePrivateAdminHandler({
  adminDb,
  initialAdminNsp,
}: {
  adminDb: IAdminDb;
  initialAdminNsp: InitialAdminNsp;
}) {
  return function privateAdminHandler({ io }: { io: Server }) {
    try {
      const online_users = {};

      const admin_nsp = initialAdminNsp({ io });

      admin_nsp.on(SocketEvents.CONNECT, (socket) => {
        socket.on(ClientEvents.ONLINE, async ({ user_id }: IUserPayload) => {
          const user_ids = Array.from(new Set(Object.values(online_users)));
          if (!user_ids.includes(user_id)) {
            await adminDb.update({
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

          await adminDb.update({
            _id: user_id,
            last_online_at: new Date(),
            is_online: false,
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
}
