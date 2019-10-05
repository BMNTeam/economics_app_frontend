import {AddDataOptions} from "../../models/add-data-options";
import {CulturesResp} from "../../models/cultures";
import {ActionPayload} from "../../shared";
import {RECEIVE_CULTURES_WITH_DATA, RECEIVE_DATA_OPTIONS} from "./add-data.actions";


export type AddDataState = AddDataOptions & {cultures: CulturesResp};

export function AddDataReducer(state: AddDataState = {} as AddDataState, action: ActionPayload<AddDataOptions> ){
  switch (action.type)
  {
    case RECEIVE_DATA_OPTIONS:{
      if(!action.payload) return;
      const {cultures, years, farm_categories, stat_types} = action.payload;
      return {...state, cultures, years, farm_categories, stat_types }
    }
    case RECEIVE_CULTURES_WITH_DATA: return {...state, cultures: action.payload};
    default: return state;
  }
}