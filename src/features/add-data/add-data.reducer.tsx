import {AddDataOptions} from "../../models/add-data-options";
import {ActionPayload} from "../../shared";
import {RECEIVE_DATA_OPTIONS} from "./add-data.actions";


export type AddDataState = AddDataOptions;

export function AddDataReducer(state: AddDataState = {} as AddDataOptions, action: ActionPayload<AddDataOptions> ){
  switch (action.type)
  {
    case RECEIVE_DATA_OPTIONS:{
      if(!action.payload) return;
      const {municipalities, years, farm_categories, stat_types} = action.payload;
      return {...state, municipalities, years, farm_categories, stat_types }
    }
    default: return state;
  }
}