export default interface ISystemConfiguration {
  _id: string;
  is_blocked_comment: boolean;
  thumbnail?: Record<string, unknown>;
  thumbnail_url?: string;
  owner?: {
    name: string;
    description: string;
    avatar: Record<string, unknown>;
  };
  owner_avatar_url?: string;
  folder_icon?: Record<string, unknown>;
  folder_icon_url?: string;
}
