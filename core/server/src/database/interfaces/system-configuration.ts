import IAdmin from "./admin";

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
  admin_excel_template_url?: string;
  user_excel_template_url?: string;
  excel_template?: {
    name: string;
    path: string;
    destination: string;
    uploaded_at: Date;
    uploaded_by: IAdmin;
    mimetype: string;
    size: number;
    type: ExcelTemplateType;
  }[];
  created_at: Date;
  updated_at: Date;
}

export enum ExcelTemplateType {
  ADMIN = "admin",
  USER = "user",
}
