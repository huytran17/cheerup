import ISystemConfiguration from "../interfaces/system-configuration";

export default class SystemConfiguration implements ISystemConfiguration {
  public readonly _id: string;
  public readonly is_blocked_comment: boolean;
  public readonly owner_avatar_url?: string;
  public readonly thumbnail?: Record<string, unknown>;
  public readonly thumbnail_url?: string;
  public readonly folder_icon?: Record<string, unknown>;
  public readonly folder_icon_url?: string;
  public readonly owner?: {
    name: string;
    description: string;
    avatar: Record<string, unknown>;
  };

  constructor({
    _id,
    is_blocked_comment,
    thumbnail_url,
    owner,
    owner_avatar_url,
    thumbnail,
    folder_icon,
    folder_icon_url,
  }: ISystemConfiguration) {
    this._id = _id;
    this.is_blocked_comment = is_blocked_comment;
    this.thumbnail = thumbnail;
    this.thumbnail_url = thumbnail_url;
    this.owner = owner;
    this.owner_avatar_url = owner_avatar_url;
    this.folder_icon = folder_icon;
    this.folder_icon_url = folder_icon_url;
  }
}
