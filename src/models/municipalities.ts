import {BaseItem} from "./base-item";
import {StatType} from "./stat-type";

export interface MunicipalitiesResp {
  farm_category: BaseItem
  years: BaseItem[];
  culture: BaseItem;
  stat_type: StatType;
  municipalities: Municipality[];
}
export interface Municipality {
  id: number;
  name: string;
  value?: number;
}