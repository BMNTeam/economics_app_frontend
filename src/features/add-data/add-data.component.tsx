import React, {ChangeEvent, useEffect, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AddDataOptions} from "../../models/add-data-options";
import {AddDataUpdateRequest} from "../../models/add-data-update.request";
import {BaseItem} from "../../models/base-item";
import {CulturesResp} from "../../models/cultures";
import {StatType} from "../../models/stat-type";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import AddDataTable from "./form/add-data-form.component";
import {CulturesParams, receiveAllOptions, receiveCulturesWithData, updateCultures} from "./add-data.actions";

interface AddDataProps {
  getAllOptions: () => void;
  getAllCulturesWithData: (params: CulturesParams) => void;
  updateCultures: (params: AddDataUpdateRequest) => void;
  years: BaseItem[];
  municipalities: BaseItem[];
  farmCategories: BaseItem[];
  statTypes: StatType[];
  cultures: CulturesResp;
}

const AddData: React.FC<AddDataProps> = (props) =>
{
  useEffect(() =>
  {
    if(!props.municipalities){
      props.getAllOptions();
    }
  }, []);

  const [municipality, setMunicipality] = useState(0);
  const municipalityChanged = (event: ChangeEvent<HTMLSelectElement>) =>
  {
    setMunicipality(+event.target.value);
  };

  const [year, setYear] = useState();
  const yearChanged = (e: ChangeEvent<HTMLSelectElement>) =>
  {
    setYear(+e.target.value);
  };

  const [statType, setStatType] = useState();
  function changedStatType(e: ChangeEvent<HTMLSelectElement>)
  {
    setStatType(e.target.value);
  }

  function tryGetAllCultures()
  {
    if(!municipality || !year || !statType) return;
    const culturesParams: CulturesParams = {municipalityId: municipality, yearId: year, statType};
    props.getAllCulturesWithData(culturesParams);
  }

  function handleSubmit(params: AddDataUpdateRequest)
  {
    props.updateCultures(params);
  }

  useEffect(() => {
    tryGetAllCultures();
  }, [municipality, year, statType]);

  const {municipalities, years, statTypes} = props;
  return (
    <div>
      <div className="card">
        <div className="card-header card-header-primary">
          <h4 className="card-title">Добавление информации в базу данных</h4>
          <p className="card-category">Введите данные</p>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="">Выберите регион</label> <br/>
                <select className="form-control" onChange={municipalityChanged}>
                  {municipalities && municipalities.map((e, i) =>
                    <option value={e.id} key={i}> {e.name}</option>)}
                </select>
              </div>
            </div>

            {
              !!municipality &&
              <div className="col-md-4">
                <div className="form-group bmd-form-group">
                  <label>Выберите год</label> <br/>
                  <select className="form-control" onChange={yearChanged}>
                    {years  && years.map((e, i) =>
                      <option value={e.id} key={i}> {e.name}</option>)}
                  </select>
                </div>
              </div>
            }

            {
              !!year &&
              <div className="col-md-4">
                <div className="form-group bmd-form-group">
                  <label>Выберите показатель</label> <br/>
                  <select className="form-control" onChange={changedStatType}>
                    {statTypes  && statTypes.map((e, i) =>
                      <option value={e.id} key={i}> {e.name} ({e.unit})</option>)}
                  </select>
                </div>
              </div>
            }
          </div>


        </div>
      </div>
      {props.cultures && statType &&  <AddDataTable cultures={props.cultures} handleSubmit={handleSubmit}/>}
    </div>
  )
};

const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<AddDataOptions>>) => ({
  getAllOptions: () => dispatch(receiveAllOptions()),
  getAllCulturesWithData: (params: CulturesParams) => dispatch(receiveCulturesWithData(params)),
  updateCultures: (params: AddDataUpdateRequest) => dispatch(updateCultures(params))
});

const mapStateToProps = (state: GlobalStore) => ({
  years: state.addData.years,
  municipalities: state.addData.municipalities,
  farmCategories: state.addData.farm_categories,
  statTypes: state.addData.stat_types,
  cultures: state.addData.cultures
});

export default connect(mapStateToProps, mapDispatchToProps)(AddData);