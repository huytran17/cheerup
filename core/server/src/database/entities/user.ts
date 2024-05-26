import IAdmin from "../interfaces/admin";
import IUser from "../interfaces/user";

export default class User implements IUser {
  public readonly _id: string;
  public readonly ip?: string;
  public readonly hash_password: string;
  public readonly avatar_url?: string;
  public readonly avatar?: Record<string, unknown>;
  public readonly email: string;
  public readonly full_name: string;
  public readonly blocked_comment_at?: Date;
  public readonly is_blocked_comment?: boolean;
  public readonly is_enabled_2fa?: boolean;
  public readonly is_online?: boolean;
  public readonly tfa_secret?: string;
  public readonly socialite?: {
    provider?: string;
  };
  public readonly login_failed_times: number;
  public readonly created_by?: IAdmin;
  public readonly last_online_at: Date;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Date;

  constructor({
    _id,
    ip,
    hash_password,
    avatar,
    email,
    full_name,
    avatar_url,
    is_blocked_comment,
    is_enabled_2fa,
    created_at,
    updated_at,
    deleted_at,
    created_by,
    blocked_comment_at,
    socialite,
    tfa_secret,
    login_failed_times,
    last_online_at,
    is_online,
  }: IUser) {
    this._id = _id;
    this.ip = ip;
    this.avatar = avatar;
    this.avatar_url = avatar_url;
    this.hash_password = hash_password;
    this.is_blocked_comment = is_blocked_comment;
    this.is_enabled_2fa = is_enabled_2fa;
    this.full_name = full_name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.created_by = created_by;
    this.blocked_comment_at = blocked_comment_at;
    this.socialite = socialite;
    this.tfa_secret = tfa_secret;
    this.login_failed_times = login_failed_times;
    this.last_online_at = last_online_at;
    this.is_online = is_online;
  }
}
