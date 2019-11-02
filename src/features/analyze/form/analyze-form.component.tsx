import React, {ChangeEvent, useEffect, useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import CheckboxComponent from "../../../components/shared/checkbox/checkbox.component";
import RadioButtonComponent from "../../../components/shared/radio-button/radio-button.component";
import SelectComponent from "../../../components/shared/select/select.component";
import {BaseItem} from "../../../models/base-item";
import {ActionPayload} from "../../../shared";
import {GlobalStore} from "../../../store";
import {connect} from "react-redux";
import {receiveAllOptions} from "../../add-data/add-data.actions";

export interface AnalyzeFormData {
  cultureId: number;
  municipalityId: number;
  statTypeId: number;
  farmCategoryId: number;
  isWithAdditionalData: boolean;
  analyzeTypeId?: number;
  isMoveData?: boolean;
  monthsIds?: number[];
}

const analyzeTypes = [{id: 1, name: "Температура"}, {id: 2, name: "Осадки"}];
const systemTypes = [{id: 1, name: "Климат"}, {id: 2, name: "Статистика"}];
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"].map((e, i) => ({
  id: i,
  name: e
}));

type AnalyzeFormProps =
  ReturnType<typeof mapStateToProps>
  & ReturnType<& typeof mapDispatchToProps>
  & { action: (d: AnalyzeFormData) => void }

const AnalyzeFormComponent: React.FC<AnalyzeFormProps> = (props) =>
{
  //#region states
  const [culture, setCulture] = useState();
  const changedCulture = (e: ChangeEvent<HTMLSelectElement>) => setCulture(e.target.value);
  const cultureSelect = <SelectComponent action={changedCulture}
                                         label={'Культура'} options={props.options.cultures}
                                         value={culture}/>;


  const [region, setRegion] = useState();
  const changedRegion = (e: ChangeEvent<HTMLSelectElement>) => setRegion(e.target.value);
  const regionSelect = <SelectComponent action={changedRegion}
                                        label={"Район"}
                                        options={props.options.regions}
                                        value={region}/>;

  const [isMoveData, setIsMoveData] = useState(false);
  const changedIsMoveData = (e: ChangeEvent<HTMLInputElement>) =>
  {
    setIsMoveData(!isMoveData);
  };

  const [weatherStation, setWeatherStation] = useState();
  const changedWeatherStation =(e: ChangeEvent<HTMLSelectElement>) => setWeatherStation(e.target.value);
  const weatherStationSelect = <SelectComponent action={changedWeatherStation}
                                        label={"Метеостанция"}
                                        options={props.options.regions}
                                        value={weatherStation}/>;


  const [statType, setStatType] = useState();
  const changedStatType = (e: ChangeEvent<HTMLSelectElement>) => setStatType(e.target.value);
  const statTypeSelect = <SelectComponent action={changedStatType}
                                          label={'Показатель'}
                                          options={props.options.stat_types}
                                          value={statType}/>;

  const [farmCategory, setFarmCategory] = useState();
  const changedFarmCategory = (e: ChangeEvent<HTMLSelectElement>) => setFarmCategory(e.target.value);
  const farmCategorySelect = <SelectComponent action={changedFarmCategory} label={'Категория хозяйств'}
                                              options={props.options.farm_categories}
                                              value={farmCategory}/>;

  const [analyzeType, setAnalyzeType] = useState();
  const changedAnalyzeType = (e: ChangeEvent<HTMLInputElement>) =>
  {
    setAnalyzeType(e.target.value);
  };

  const [systemType, setSystemType] = useState();
  const changedSystemType = (e: ChangeEvent<HTMLInputElement>) =>
  {
    setSystemType(e.target.value);
  };

  const [month, setMonth] = useState([] as number[]);
  const changedMonth = (e: ChangeEvent<HTMLInputElement>) =>
  {
    const id = +e.target.value;
    if (month.includes(id))
    {
      return setMonth([...month.filter(e => e !== id)]);
    }
    return setMonth([...month, id]);
  };
  //#endregion

  //#region effects
  const receiveOptionsIfNotExists = () => !(props.options && props.options.years) && props.getAllOptions();
  useEffect(() =>
  {
    receiveOptionsIfNotExists();
  });
  //#endregion

  const isAnalyzeButtonActive = () =>
  {
    return culture && region && statType && farmCategory;
  };

  const getFormData = () =>
  {
    const data: AnalyzeFormData = {
      cultureId: culture,
      farmCategoryId: farmCategory,
      municipalityId: region,
      statTypeId: statType,
      isWithAdditionalData: false
    };

    return !(analyzeType && month.length) ? data : {
      ...data,
      monthsIds: month,
      isMoveData: isMoveData,
      analyzeTypeId: analyzeType,
      isWithAdditionalData: true
    }
  };
  const holdSubmitEvent = (e: ChangeEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    props.action(getFormData());
  };


  return (
    <div>
      <form onSubmit={holdSubmitEvent}>
        <div className="row">
          <div className="col-sm-3">
            {cultureSelect}
          </div>
          <div className="col-sm-3">
            {culture && regionSelect}
          </div>
          <div className="col-sm-3">
            {culture && region && statTypeSelect}
          </div>
          <div className="col-sm-3">
            {culture && region && statType && farmCategorySelect}
          </div>
        </div>
        {
          isAnalyzeButtonActive() &&
          <div>
            <br/>
            <h6> Выберите дополнительную шкалу</h6>
            <div className="row">
              <div className="col-sm-1">
                    {systemTypes.map((e, i) => <RadioButtonComponent action={changedSystemType}
                                                                      option={e} key={i}
                                                                      name="systemType"/>)}

              </div>
              <div className="col-sm-2">
                  {analyzeTypes.map((e, i) => <RadioButtonComponent action={changedAnalyzeType}
                                                                    option={e} key={i}
                                                                    name="analyzeType"/>)}
              </div>
              <div className="col-sm-9">
                <div className="d-flex justify-content-between align-items-center h-100">
                  {months.map((e, i) => <CheckboxComponent action={changedMonth} option={e} key={i}/>)}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-2 offset-1">
                <div className="form-group bmd-form-group">
                  <label htmlFor="">Корреляция</label>
                  <CheckboxComponent action={changedIsMoveData} option={{id: 1, name: "Сдвиг"}}/>
                </div>
              </div>
              <div className="col-sm-2">
                {weatherStationSelect}
              </div>

            </div>
          </div>
        }
        <br/>
        <div className={"text-right"}>
          <button type={"submit"} disabled={!isAnalyzeButtonActive()} className="btn btn-primary"> Анализировать</button>
        </div>

      </form>
    </div>
  )
};

function mapStateToProps(state: GlobalStore)
{
  return {options: state.addData};
}

function mapDispatchToProps(dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<void>>)
{
  return {getAllOptions: () => dispatch(receiveAllOptions())};
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeFormComponent);