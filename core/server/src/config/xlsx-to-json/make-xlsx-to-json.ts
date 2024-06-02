import ConvertXlsxToJson from "convert-xlsx-to-json";

export interface IXlsxToJSON {
  source: string;
  options?: Record<string, unknown>;
}

export type XlsxToJSON = ({ source, options }: IXlsxToJSON) => object;

export default function makeXlsxToJSON({
  convertXlsxToJson,
}: {
  convertXlsxToJson: typeof ConvertXlsxToJson;
}): XlsxToJSON {
  return function xlsxToJSON({ source, options = {} }) {
    const converted = convertXlsxToJson({
      sourceFile: source,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
      ...options,
    });

    return converted;
  };
}
