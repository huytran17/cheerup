import IGallery from "../../src/database/interfaces/gallery";

export type FakeGallery = () => IGallery;

export default function makeFakeGallery({
  faker,
}: {
  faker: any;
}): FakeGallery {
  return function fakeGallery(): IGallery {
    return {
      _id: faker.database.mongodbObjectId(),
      name: faker.name.fullName(),
      parent: faker.database.mongodbObjectId(),
      items: [],
      created_by: faker.database.mongodbObjectId(),
      updated_at: faker.date.recent(),
      created_at: faker.date.recent(),
    };
  };
}
