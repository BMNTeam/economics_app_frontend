import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import {receiveEconomicGraphData} from "./analyze.actions";
import AnalyzeFormComponent, {AnalyzeFormData} from "./form/analyze-form.component";
import {AnalyzeGraphComponent} from "./graph/graph.component";
import {Correlation} from "./mock-climate/correlation";
import {MockClimateTemperature} from "./mock-climate/mock-climate-temperature";

type AnalyzeComponentProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

const AnalyzeComponent:React.FC<AnalyzeComponentProps> =  (props) => {
  const [analyzeData, setAnalyzeData] = useState<AnalyzeFormData>();
  const changedAnalyzedData = (d: AnalyzeFormData) => setAnalyzeData(d);

  const [climateGraphData, setClimateGraphData] = useState();

  const getClimateGraphData = (analyzeData: AnalyzeFormData) => {
    return analyzeData.isWithAdditionalData && analyzeData.monthsIds
      ? new MockClimateTemperature(analyzeData.monthsIds, analyzeData.isMoveData).getGraphData()
      : null
  };

  useEffect(() => {
    if(!analyzeData) return;
    setClimateGraphData(getClimateGraphData(analyzeData));
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
        </div>
      </div>

      {analyzeData && props.analyzeData.stat_type &&
      <div className="card">
        <div className="card-body">
          {
            <AnalyzeGraphComponent mockData={climateGraphData} data={props.analyzeData}/>
          }
          {
            climateGraphData &&
            <h3> Коэффициент парной линейной корреляции:
              <b className={'pl-3'}>{new Correlation(props.analyzeData.graph_data, climateGraphData).getCoefficient()}</b>
            </h3>
          }
        </div>
      </div>
      }
    </div>
  )
};

function mapStateToProps(state: GlobalStore)
{
  return {
    analyzeData: state.analyze
  }
}
function mapDispatchToProps (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<AnalyzeFormData>>){
  return {getGraphData: (data: AnalyzeFormData) => dispatch(receiveEconomicGraphData(data))}
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeComponent);