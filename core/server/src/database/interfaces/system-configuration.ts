export default interface ISystemConfiguration {
  _id: string;
  is_blocked_comment: boolean;
  is_maintaining: boolean;
  client_favicon_url: string;
  client_logo_url: string;
  admin_favicon_url: string;
  admin_logo_url: string;
  client_owner_avatar_url: string;
  client_meta: {
    title: string;
    description: string;
    author: string;
    owner: {
      name: string;
      description: string;
      avatar: Record<string, unknown>;
    };
    keywords: string[];
    logo: Record<string, unknown>;
    favicon: Record<string, unknown>;
  };
  admin_meta: {
    title: string;
    description: string;
    author: string;
    logo: Record<string, unknown>;
    favicon: Record<string, unknown>;
  };
}
