export interface IQueryParams {
  query: string;
  page: number;
  entries_per_page: number;
}

export type FakeQueryParams = () => IQueryParams;

export default function makeFakeQueryParams({
  faker,
}: {
  faker: any;
}): FakeQueryParams {
  return function fakeQueryParams(): IQueryParams {
    return {
      query: faker.lorem.word(),
      page: faker.datatype.number({ min: 1, max: 1 }),
      entries_per_page: faker.datatype.number({ min: 15, max: 30 }),
    };
  };
}
