import ConvertExcelToJson from "convert-excel-to-json";

export interface IExcelToJSON {
  source: string;
  sheet?: string;
  options?: Record<string, unknown>;
}

export type ExcelToJSON = ({ source, sheet, options }: IExcelToJSON) => any;

export default function makeExcelToJSON({
  convertExcelToJson,
}: {
  convertExcelToJson: typeof ConvertExcelToJson;
}): ExcelToJSON {
  return function excelToJSON({ source, sheet = "", options = {} }) {
    const converted = convertExcelToJson({
      sourceFile: source,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
      ...options,
    });

    if (sheet) {
      return converted[sheet];
    }

    return converted;
  };
}
