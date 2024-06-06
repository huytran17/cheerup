import IAdmin from "../interfaces/admin";
import ISystemConfiguration, {
  ExcelTemplateType,
} from "../interfaces/system-configuration";

export default class SystemConfiguration implements ISystemConfiguration {
  public readonly _id: string;
  public readonly is_blocked_comment: boolean;
  public readonly owner_avatar_url?: string;
  public readonly thumbnail?: Record<string, unknown>;
  public readonly thumbnail_url?: string;
  public readonly folder_icon?: Record<string, unknown>;
  public readonly folder_icon_url?: string;
  public readonly admin_excel_template_url?: string;
  public readonly post_excel_template_url?: string;
  public readonly user_excel_template_url?: string;
  public readonly category_excel_template_url?: string;
  public readonly owner?: {
    name: string;
    description: string;
    avatar: Record<string, unknown>;
  };
  public readonly excel_template?: {
    name: string;
    path: string;
    destination: string;
    uploaded_at: Date;
    uploaded_by: IAdmin;
    mimetype: string;
    size: number;
    type: ExcelTemplateType;
  }[];
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    is_blocked_comment,
    thumbnail_url,
    owner,
    owner_avatar_url,
    thumbnail,
    folder_icon,
    folder_icon_url,
    excel_template,
    admin_excel_template_url,
    post_excel_template_url,
    user_excel_template_url,
    category_excel_template_url,
    created_at,
    updated_at,
  }: ISystemConfiguration) {
    this._id = _id;
    this.is_blocked_comment = is_blocked_comment;
    this.thumbnail = thumbnail;
    this.thumbnail_url = thumbnail_url;
    this.owner = owner;
    this.owner_avatar_url = owner_avatar_url;
    this.folder_icon = folder_icon;
    this.folder_icon_url = folder_icon_url;
    this.excel_template = excel_template;
    this.admin_excel_template_url = admin_excel_template_url;
    this.post_excel_template_url = post_excel_template_url;
    this.user_excel_template_url = user_excel_template_url;
    this.category_excel_template_url = category_excel_template_url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
