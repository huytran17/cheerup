import ISystemConfiguration from "../../src/database/interfaces/system-configuration";

export type FakeSystemConfiguration = () => ISystemConfiguration;

export default function makeSystemConfiguration({
  faker,
}: {
  faker: any;
}): FakeSystemConfiguration {
  return function fakeSystemConfiguration(): ISystemConfiguration {
    return {
      _id: faker.database.mongodbObjectId(),
      is_blocked_comment: false,
      client_favicon_url: faker.internet.url(),
      client_logo_url: faker.internet.url(),
      admin_favicon_url: faker.internet.url(),
      admin_folder_icon_url: faker.internet.url(),
      admin_logo_url: faker.internet.url(),
      client_owner_avatar_url: faker.internet.url(),
    };
  };
}
