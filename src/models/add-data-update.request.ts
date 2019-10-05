import {Municipality} from "./municipalities";

export interface AddDataUpdateRequest {
  cultureId: number;
  statTypeId: number;
  data: {yearId: number; municipalities: Municipality[]}[]
}