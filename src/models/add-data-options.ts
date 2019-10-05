import {BaseItem} from "./base-item";
import {StatType} from "./stat-type";

export interface AddDataOptions {
  years: BaseItem[];
  cultures: BaseItem[];
  farm_categories: BaseItem[];
  stat_types: StatType[];
}