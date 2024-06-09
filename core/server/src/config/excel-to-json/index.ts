import convertExcelToJson from "convert-excel-to-json";
import makeExcelToJSON from "./make-excel-to-json";

const excelToJSON = makeExcelToJSON({
  convertExcelToJson,
});

export { excelToJSON };
