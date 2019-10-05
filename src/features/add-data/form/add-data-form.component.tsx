import React, {ChangeEvent, ReactElement, useEffect} from "react";
import {connect} from "react-redux";
import {AddDataUpdateRequest} from "../../../models/add-data-update.request";
import "./add-data-form.component.scss";
import {MunicipalitiesResp, Municipality} from "../../../models/municipalities";

type AddDataTableProps = { municipalities: MunicipalitiesResp, handleSubmit: (params: AddDataUpdateRequest) => void }

export const AddDataTable: React.FC<AddDataTableProps> = (props) =>
{
  const {municipalities, culture , stat_type, years} = props.municipalities;

  useEffect(() => {
  }, [culture, stat_type, years]);

  function holdSubmit(e: ChangeEvent<HTMLFormElement>)
  {
    e.preventDefault();
    const data = new AddDataRequest(e.target.elements, props);
    props.handleSubmit(data.get());
  }
  return (
    <div className="card add-data-form-component">
      <div className="card-body">
        <h4>Ввод данных для {culture.name} ({stat_type.name}, {stat_type.unit})</h4>

        <form onSubmit={holdSubmit}>
          <div className="table-responsive fixed-height">
            <table className="table table-hover ">
              <thead className=" text-primary">
              <tr>
                <th></th>
                <th> {years[0].name}</th>
              </tr>
              </thead>
              <tbody>
              {municipalities.map((m, i) => <tr key={i}>
                <td>
                  <span>{m.name}</span>
                </td>
                <td>
                  <div className="form-group bmd-form-group">
                    <input name={`${m.id};${years[0].id}`}
                           key={Math.random()}
                           placeholder={stat_type.unit}
                           type="number" step="0.01"
                           defaultValue={(!!m.value && m.value.toString()) || ""}
                           className="form-control"/>
                  </div>
                </td>
              </tr>)}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary pull-right">Сохранить</button>

        </form>
      </div>
    </div>
  )
};

type MunicipalityWithYear = Municipality & { yearId: number };

class AddDataRequest {

  private readonly elements: HTMLInputElement[];
  private readonly culturesNamesHash: Record<string, string>;

  constructor(elements: HTMLFormControlsCollection, private props: AddDataTableProps)
  {
    this.elements = this.mutateToHtmlInputElement(elements);
    this.culturesNamesHash = this.getCulturesNamesHash(props.municipalities.municipalities);
  }

  get(): AddDataUpdateRequest
  {
    return this.prepareData(this.elements);
  }


  private prepareData(elements: HTMLInputElement[])
  {
    const dataFromElement = this.extractDataFromElement(elements);
    const dataGroupedByYear = this.groupByYear(dataFromElement);
    return this.getFullRequestData(dataGroupedByYear);
  }

  private extractDataFromElement(elements: HTMLInputElement[]): MunicipalityWithYear[]
  {
    return elements
      .map(e =>
      {
        const [id, yearId] = e.name.split(";");
        return {id: +id, value: (e.value && +e.value) || undefined, yearId: +yearId, name: this.culturesNamesHash[id]};
      })
  }

  private groupByYear(elements: MunicipalityWithYear[]): Record<string, Municipality[]>
  {
    return elements.reduce((acc, c) =>
    {
      const culture: Municipality = {id: +c.id, name: c.name, value: c.value};
      if (!acc[c.yearId]) acc[c.yearId] = [];
      acc[c.yearId] = acc[c.yearId].concat(culture);
      return acc;
    }, {} as Record<string, Municipality[]>);
  }

  private getFullRequestData(elements: Record<string, Municipality[]>): AddDataUpdateRequest
  {
    return {
      cultureId: this.props.municipalities.culture.id,
      statTypeId: this.props.municipalities.stat_type.id,
      data: Object.entries(elements).map(([k,v]) => ({yearId: +k, municipalities: v}))
    }
  }


  private mutateToHtmlInputElement(elements: HTMLFormControlsCollection)
  {
    return Array
      .from(elements)
      .filter(e => e.nodeName === "INPUT") as HTMLInputElement[];
  }

  private getCulturesNamesHash(cultures: Municipality[])
  {
    return cultures.reduce((acc,c) => (acc[c.id]=c.name, acc), {} as Record<string, string>);
  }
}
export default connect()(AddDataTable)