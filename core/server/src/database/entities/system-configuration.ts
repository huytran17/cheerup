import ISystemConfiguration from "../interfaces/system-configuration";

export default class SystemConfiguration implements ISystemConfiguration {
  public readonly _id: string;
  public readonly is_block_comment: boolean;
  public readonly is_maintaining: boolean;
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
    is_block_comment,
    is_maintaining,
    client_meta,
  }: ISystemConfiguration) {
    this._id = _id;
    this.is_block_comment = is_block_comment;
    this.is_maintaining = is_maintaining;
    this.client_meta = client_meta;
  }
}
