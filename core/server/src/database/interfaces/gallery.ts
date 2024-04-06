import IAdmin from "./admin";
import ILocalFile from "./local-file";

export default interface IGallery {
  _id: string;
  name: string;
  parent?: IGallery;
  items: ILocalFile[];
  created_by: IAdmin;
  created_at: Date;
  updated_at: Date;
}
