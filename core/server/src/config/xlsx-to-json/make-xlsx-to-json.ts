import ConvertXlsxToJson from "convert-xlsx-to-json";

export interface IXlsxToJSON {
  source: string;
  options?: Record<string, unknown>;
}

export type XlsxToJSON = ({ source, options }: IXlsxToJSON) => object;

export default function makeConvertXlsxToJSON({
  xlsxToJson,
}: {
  xlsxToJson: typeof ConvertXlsxToJson;
}): XlsxToJSON {
  return function convertXlsxToJSON({ source, options = {} }) {
    const converted = xlsxToJson({
      sourceFile: source,
      header: {
        rows: 1,
      },
      ...options,
    });

    return converted;
  };
}
