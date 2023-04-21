import ISystemConfiguration from "../../src/database/interfaces/system-configuration";

export type FakeSystemConfiguration = () => ISystemConfiguration;

export default function makeFakeSystemConfiguration({
  faker,
}: {
  faker: any;
}): FakeSystemConfiguration {
  return function fakeSystemConfiguration(): ISystemConfiguration {
    return {
      _id: faker.database.mongodbObjectId(),
      is_blocked_comment: false,
      owner_avatar_url: faker.internet.url(),
      thumbnail_url: faker.internet.url(),
      folder_icon_url: faker.internet.url(),
    };
  };
}
