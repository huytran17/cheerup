import ILocalFile from "../interfaces/local-file";

export default class LocalFile implements ILocalFile {
  public readonly _id: string;
  public readonly filename: string;
  public readonly originalname: string;
  public readonly encoding: string;
  public readonly mimetype: string;
  public readonly destination: string;
  public readonly path: string;
  public readonly size: number;
  public readonly created_at: Date;

  constructor({
    _id,
    filename,
    originalname,
    encoding,
    mimetype,
    destination,
    path,
    size,
    created_at,
  }: ILocalFile) {
    this._id = _id;
    this.filename = filename;
    this.originalname = originalname;
    this.encoding = encoding;
    this.mimetype = mimetype;
    this.destination = destination;
    this.path = path;
    this.size = size;
    this.created_at = created_at;
  }
}
