import fs from "fs";

export function writeCSV(data: any[], path: string) {
  const headers = Object.keys(data[0]).join(",");

  const rows = data.map((row) => Object.values(row).join(","));

  const csv = [headers, ...rows].join("\n");

  fs.writeFileSync(path, csv);
}
