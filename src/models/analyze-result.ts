import {AnalyzeYearData} from "./analyze-year-data";
import {StatType} from "./stat-type";

export interface AnalyzeResult {
  graph_data: AnalyzeYearData[];
  stat_type: StatType;
}