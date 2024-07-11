import JSON2XLS from "json2xls";

export interface IJsonToXls {
  payload: any;
}

export type JsonToXls = ({ payload }: IJsonToXls) => Buffer;

export default function makeJsonToXls({
  json2xls,
}: {
  json2xls: typeof JSON2XLS;
}): JsonToXls {
  return function jsonToXls({ payload }) {
    return json2xls(payload);
  };
}
