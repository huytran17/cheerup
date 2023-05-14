import { AdminType } from "../database/interfaces/admin";

const AuthorizationRole = {
  ONLY_OWNER: [AdminType.Owner],
  OWNER_AND_COLLABORATOR: [AdminType.Owner, AdminType.Collaborator],
  OWNER_AND_EDITOR: [AdminType.Owner, AdminType.Editor],
};

export default Object.freeze({
  AuthorizationRole,
});

export { AuthorizationRole };
