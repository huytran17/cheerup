import export_from_json, { ExportType } from "export-from-json";

export interface IExportFromJson {
  data: any;
  fileName: string;
  exportType?: ExportType | undefined;
}

export type ExportFromJson = ({
  data,
  fileName,
  exportType,
}: IExportFromJson) => void;

export default function makeExportFromJSON({
  exportFromJson,
}: {
  exportFromJson: typeof export_from_json;
}): ExportFromJson {
  return function exportFromJSON({ data, fileName, exportType = "xls" }) {
    exportFromJson({ data, fileName, exportType });
  };
}
