import ISystemConfiguration from "../interfaces/system-configuration";

export default class SystemConfiguration implements ISystemConfiguration {
  public readonly _id: string;
  public readonly is_blocked_comment: boolean;
  public readonly is_maintaining: boolean;
  public readonly admin_logo_url: string;
  public readonly admin_favicon_url: string;
  public readonly client_logo_url: string;
  public readonly client_favicon_url: string;
  public readonly client_meta: {
    title: string;
    description: string;
    author: string;
    keywords: string[];
    logo: Record<string, unknown>;
    favicon: Record<string, unknown>;
  };
  public readonly admin_meta: {
    title: string;
    description: string;
    author: string;
    logo: Record<string, unknown>;
    favicon: Record<string, unknown>;
  };

  constructor({
    _id,
    is_blocked_comment,
    is_maintaining,
    client_meta,
    admin_meta,
    admin_logo_url,
    admin_favicon_url,
    client_logo_url,
    client_favicon_url,
  }: ISystemConfiguration) {
    this._id = _id;
    this.is_blocked_comment = is_blocked_comment;
    this.is_maintaining = is_maintaining;
    this.client_meta = client_meta;
    this.admin_meta = admin_meta;
    this.admin_logo_url = admin_logo_url;
    this.admin_favicon_url = admin_favicon_url;
    this.client_logo_url = client_logo_url;
    this.client_favicon_url = client_favicon_url;
  }
}
