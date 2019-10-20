import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import {receiveEconomicGraphData} from "./analyze.actions";
import AnalyzeFormComponent, {AnalyzeFormData} from "./form/analyze-form.component";
import {AnalyzeGraphComponent} from "./graph/graph.component";

type AnalyzeComponentProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const AnalyzeComponent:React.FC<AnalyzeComponentProps> =  (props) => {
  const [analyzeData, setAnalyzeData] = useState();
  const changedAnalyzedData = (d: AnalyzeFormData) => setAnalyzeData(d);

  useEffect(() => {
    if(!analyzeData) return;
    props.getGraphData(analyzeData);
  }, [analyzeData]);



  return (
    <div>
      <div className="card">
        <div className="card-header card-header-primary">
          <h4 className="card-title">Анализ имеющихся данных</h4>
          <p className="card-category">Выберите данные для анализа</p>
        </div>
        <div className="card-body">
          <AnalyzeFormComponent action={changedAnalyzedData}/>
          <br/>
          {
            analyzeData && props.graphData &&
            <AnalyzeGraphComponent data={props.graphData}/>
          }
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state: GlobalStore)
{
  return {
    graphData: state.analyze.graph_data
  }
}
function mapDispatchToProps (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<AnalyzeFormData>>){
  return {getGraphData: (data: AnalyzeFormData) => dispatch(receiveEconomicGraphData(data))}
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeComponent);