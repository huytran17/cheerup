export default interface ISystemConfiguration {
  _id: string;
  is_block_comment: boolean;
  is_maintaining: boolean;
  client_meta: {
    title: string;
    description: string;
    author: string;
    keywords: string[];
    logo?: Record<string, unknown>;
    favicon?: Record<string, unknown>;
  };
  admin_meta: {
    title: string;
    description: string;
    author: string;
    logo?: Record<string, unknown>;
    favicon?: Record<string, unknown>;
  };
}
