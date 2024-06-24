import { AdminType } from "../database/interfaces/admin";

const AuthorizationRole = {
  ONLY_OWNER: [AdminType.Owner],
  OWNER_AND_COLLABORATOR: [AdminType.Owner, AdminType.Collaborator],
};

export { AuthorizationRole };
