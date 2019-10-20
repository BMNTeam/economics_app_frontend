import React, {useEffect, useState} from "react";
import AnalyzeFormComponent, {AnalyzeFormData} from "./form/analyze-form.component";

const AnalyzeComponent:React.FC =  () => {
  const [analyzeData, setAnalyzeData] = useState();
  const changedAnalyzedData = (d: AnalyzeFormData) => setAnalyzeData(d);

  useEffect(() => {

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
    </div>
  )
};

export {AnalyzeComponent};