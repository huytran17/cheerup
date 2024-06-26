import IAdmin from "../interfaces/admin";
import IGallery from "../interfaces/gallery";
import ILocalFile from "../interfaces/local-file";

export default class Gallery implements IGallery {
  public readonly _id: string;
  public readonly name: string;
  public readonly parent?: Gallery;
  public readonly items: ILocalFile[];
  public readonly created_by: IAdmin;
  public readonly created_at: Date;
  public readonly updated_at: Date;

  constructor({
    _id,
    name,
    items,
    parent,
    created_by,
    created_at,
    updated_at,
  }: IGallery) {
    this._id = _id;
    this.name = name;
    this.items = items;
    this.parent = parent;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
