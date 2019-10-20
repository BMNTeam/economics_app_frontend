import React, {ChangeEvent, useEffect, useState} from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import SelectComponent from "../../components/shared/select/select.component";
import {AddDataOptions} from "../../models/add-data-options";
import {AddDataUpdateRequest} from "../../models/add-data-update.request";
import {BaseItem} from "../../models/base-item";
import {MunicipalitiesResp} from "../../models/municipalities";
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
  municipalities: MunicipalitiesResp;
  farmCategories: BaseItem[];
  statTypes: StatType[];
  cultures: BaseItem[];
}

const AddData: React.FC<AddDataProps> = (props) =>
{
  useEffect(() =>
  {
    if(!props.municipalities){
      props.getAllOptions();
    }
  }, []);

  const [culture, setCulture] = useState(0);
  const cultureChanged = (event: ChangeEvent<HTMLSelectElement>) =>
  {
    setCulture(+event.target.value);
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

  const [farmCategory, setFarmCategory] = useState();
  function changedFarmCategory(e: ChangeEvent<HTMLSelectElement>)
  {
    setFarmCategory(e.target.value);
  }

  function tryGetAllCultures()
  {
    if(!culture || !year || !statType || !farmCategory) return;
    const culturesParams: CulturesParams = {cultureId: culture, yearId: year, statType, farmCategory};
    props.getAllCulturesWithData(culturesParams);
  }

  function handleSubmit(params: AddDataUpdateRequest)
  {
    props.updateCultures(params);
  }

  useEffect(() => {
    tryGetAllCultures();
  }, [culture, year, statType, farmCategory]);

  const {cultures, years, statTypes, farmCategories} = props;
  return (
    <div>
      <div className="card">
        <div className="card-header card-header-primary">
          <h4 className="card-title">Добавление информации в базу данных</h4>
          <p className="card-category">Введите данные</p>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-md-3">
              <SelectComponent action={cultureChanged} label="Выберите культуру" options={cultures}/>
            </div>

            {
              !!culture &&
              <div className="col-md-3">
                <SelectComponent action={yearChanged} options={years} label="Выберите год"/>
              </div>
            }

            {
              !!year &&
              <div className="col-md-3">
                <SelectComponent action={changedStatType}
                                 label="Выберите показатель"
                                 options={statTypes.map(v => ({...v, name: `${v.name} (${v.unit})`})).filter(v => v.id !== 3)}
                />
              </div>
            }

            {
              !!statType &&
              <div className="col-md-3">
                <SelectComponent action={changedFarmCategory}
                                 label="Выберите категорию хозяйств"
                                 options={farmCategories}
                />
              </div>
            }
          </div>


        </div>
      </div>
      {props.municipalities && farmCategory &&  <AddDataTable
          municipalities={props.municipalities} handleSubmit={handleSubmit}/>
      }
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