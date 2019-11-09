import React, {ChangeEvent} from "react";
import SelectComponent from "../../../components/shared/select/select.component";
import {AddDataState} from "../../add-data/add-data.reducer";

export interface ClimateFormState {
  region: number;
  culture: number;
  farmCategory: number;
  statType: number;
}

interface ClimateFormProps {
  options: AddDataState;
  setClimateData: (data: ClimateFormState) => void
}

class ClimateFormComponent extends React.Component<ClimateFormProps, Record<keyof ClimateFormState, string>>{

  constructor(props: ClimateFormProps) {
    super(props);
    this.state = { region: "", culture: "", farmCategory: "", statType: ""};
  }

  componentDidUpdate(prevProps: Readonly<ClimateFormProps>, prevState: Readonly<Record<keyof ClimateFormState, string>>, snapshot?: any): void
  {
    if (Object.values(this.state).every(v => !!v) && prevState !== this.state)
    {
      this.props.setClimateData(this.getStateAsNumbers());
    }
  }

  private getStateAsNumbers()
  {
    return Object.entries(this.state).reduce((acc, [k,v]) => (acc[k as keyof ClimateFormState] = +v, acc), {} as Record<keyof ClimateFormState, number>)
  }

  render()
  {
    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <SelectComponent action={e => this.changed(e, "culture")}
                             label={'Культура'} options={this.props.options.cultures}
                             value={this.state.culture}/>
          </div>
          <div className="col-sm-3">
            {
              this.state.culture &&  <SelectComponent action={ e => this.changed(e, "region")}
                                                      label={"Район"}
                                                      options={this.props.options.regions}
                                                      value={this.state.region}/>
            }
          </div>
          <div className="col-sm-3">
            {
              this.state.region &&  <SelectComponent action={e => this.changed(e, "statType")}
                                                     label={'Показатель'}
                                                     options={this.props.options.stat_types}
                                                     value={this.state.statType}/>
            }
          </div>
          <div className="col-sm-3">
            {
              this.state.statType && <SelectComponent action={e => this.changed(e, "farmCategory")} label={'Категория хозяйств'}
                                                      options={this.props.options.farm_categories}
                                                      value={this.state.farmCategory}/>
            }
          </div>
        </div>

      </div>
    );
  }

  private changed(e: ChangeEvent<HTMLSelectElement>, name: keyof ClimateFormState)
  {
    this.setState({...this.state, [name]: e.target.value})
  }

}

export default ClimateFormComponent;