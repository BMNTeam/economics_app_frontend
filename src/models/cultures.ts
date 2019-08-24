import {BaseItem} from "./base-item";
import {StatType} from "./stat-type";

export interface CulturesResp {
  years: BaseItem[];
  municipality: BaseItem;
  stat_type: StatType;
  cultures: {[key: string]: Culture[]};
}
export interface Culture {
  id: number;
  name: string;
  value?: number;
}