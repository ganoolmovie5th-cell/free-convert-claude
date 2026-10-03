import * as XLSX from "xlsx";
import { baseName, ConvertResult, TargetFormat } from "./types";

async function readWorkbook(file: File): Promise<XLSX.WorkBook> {
  const buf = await file.arrayBuffer();
  return XLSX.read(buf, { type: "array" });
}

export async function convertData(
  file: File,
  target: TargetFormat,
): Promise<ConvertResult> {
  const wb = await readWorkbook(file);
  const first = wb.SheetNames[0];
  const sheet = wb.Sheets[first];
  const name = baseName(file.name);

  if (target === "csv") {
    const csv = XLSX.utils.sheet_to_csv(sheet);
    return {
      blob: new Blob([csv], { type: "text/csv;charset=utf-8" }),
      filename: `${name}.csv`,
    };
  }

  if (target === "json") {
    const rows = XLSX.utils.sheet_to_json(sheet);
    return {
      blob: new Blob([JSON.stringify(rows, null, 2)], {
        type: "application/json",
      }),
      filename: `${name}.json`,
    };
  }

  if (target === "xlsx") {
    const out = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    return {
      blob: new Blob([out], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      filename: `${name}.xlsx`,
    };
  }

  throw new Error("Format data tidak didukung: " + target);
}
