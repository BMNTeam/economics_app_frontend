import {AddDataOptions} from "../../models/add-data-options";
import {MunicipalitiesResp} from "../../models/municipalities";
import {ActionPayload} from "../../shared";
import {RECEIVE_MUNICIPALITIES_WITH_DATA, RECEIVE_DATA_OPTIONS} from "./add-data.actions";


export type AddDataState = AddDataOptions & {municipalities: MunicipalitiesResp};

export function AddDataReducer(state: AddDataState = {} as AddDataState, action: ActionPayload<AddDataOptions> ){
  switch (action.type)
  {
    case RECEIVE_DATA_OPTIONS:{
      if(!action.payload) return;
      const {cultures, years, farm_categories, stat_types} = action.payload;
      return {...state, cultures, years, farm_categories, stat_types }
    }
    case RECEIVE_MUNICIPALITIES_WITH_DATA: return {...state, municipalities: action.payload};
    default: return state;
  }
}