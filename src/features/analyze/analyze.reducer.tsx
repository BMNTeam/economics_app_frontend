import {AnalyzeResult} from "../../models/analyze-result";
import {ActionPayload} from "../../shared";
import {RECEIVE_ECONOMIC_GRAPH_DATA} from "./analyze.actions";

export type AnalyzeState = AnalyzeResult;

export function AnalyzeDataReducer (state: AnalyzeState = {} as AnalyzeState, action: ActionPayload<AnalyzeResult> ) {
  switch (action.type)
  {
    case RECEIVE_ECONOMIC_GRAPH_DATA: {
      return {...state, ...action.payload};
    }
    default: {
      return state
    }
  }
}