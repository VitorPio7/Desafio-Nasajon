import "dotenv/config";

import { AuthService } from "../services/AuthService";
import { IBGEService } from "../services/IBGEService";
import { SubmitService } from "../services/SubmitService";

import { processMunicipios } from "../core/ProcessMunicipios";
import { calculateStats } from "../core/CalculateStats";

import { readCSV } from "../csv/csvReader";
import { writeCSV } from "../csv/csvWriter";

import path from "path";

async function main() {
  const authService = new AuthService();
  const ibgeService = new IBGEService();
  const submitService = new SubmitService();
  const token = await authService.login(
    process.env.EMAIL!,
    process.env.PASSWORD!,
  );
  const filePath = path.resolve(process.cwd(), "data/input.csv");
  const csvData = await readCSV(filePath);
  const municipios = await ibgeService.getMunicipios();

  const results = processMunicipios(csvData, municipios);

  writeCSV(results, "resultado.csv");

  const stats = calculateStats(results);

  const response = await submitService.send(stats, token);
  console.log("lendo CSV de:",filePath)

}

main();
