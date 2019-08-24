import {Culture} from "./cultures";

export interface AddDataUpdateRequest {
  municipalityId: number;
  statTypeId: number;
  data: {yearId: number; cultures: Culture[]}[]
}