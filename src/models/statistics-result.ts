import {LastData} from "./last-data";
import {ShortStatistics} from "./short-statistics";

export interface StatisticsResult {
  short_statistics: ShortStatistics;
  last_data:        LastData[];
}