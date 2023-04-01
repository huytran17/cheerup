import ISystemConfiguration from "../interfaces/system-configuration";

export default class SystemConfiguration implements ISystemConfiguration {
  public readonly _id: string;
  public readonly is_blocked_comment: boolean;
  public readonly admin_logo_url?: string;
  public readonly admin_favicon_url?: string;
  public readonly admin_folder_icon_url?: string;
  public readonly client_logo_url?: string;
  public readonly client_favicon_url?: string;
  public readonly client_owner_avatar_url?: string;
  public readonly client_meta?: {
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
  public readonly admin_meta?: {
    title: string;
    description: string;
    author: string;
    logo: Record<string, unknown>;
    favicon: Record<string, unknown>;
    folder_icon: Record<string, unknown>;
  };

  constructor({
    _id,
    is_blocked_comment,
    client_meta,
    admin_meta,
    admin_logo_url,
    admin_favicon_url,
    client_logo_url,
    client_favicon_url,
    client_owner_avatar_url,
    admin_folder_icon_url,
  }: ISystemConfiguration) {
    this._id = _id;
    this.is_blocked_comment = is_blocked_comment;
    this.client_meta = client_meta;
    this.admin_meta = admin_meta;
    this.admin_logo_url = admin_logo_url;
    this.admin_favicon_url = admin_favicon_url;
    this.client_logo_url = client_logo_url;
    this.client_favicon_url = client_favicon_url;
    this.client_owner_avatar_url = client_owner_avatar_url;
    this.admin_folder_icon_url = admin_folder_icon_url;
  }
}
