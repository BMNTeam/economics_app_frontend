import React, {ChangeEvent, ReactElement} from "react";
import {connect} from "react-redux";
import {AddDataUpdateRequest} from "../../../models/add-data-update.request";
import {Culture, CulturesResp} from "../../../models/cultures";
import "./add-data-form.component.scss";
import {defineClassName} from "../../../shared";

type AddDataTableProps = { cultures: CulturesResp, handleSubmit: (params: AddDataUpdateRequest) => void }

export const AddDataTable: React.FC<AddDataTableProps> = (props) =>
{
  const {municipality, cultures, stat_type, years} = props.cultures;
  const groupsNameHash = Object.keys(cultures).reduce((acc, cur) => (acc[cur] = cur, acc), {} as Record<string, string>);
  const ungroupedCultures = getUngroupedCultures(cultures);

  function holdSubmit(e: ChangeEvent<HTMLFormElement>)
  {
    e.preventDefault();
    const data = new AddDataRequest(e.target.elements, props);
    props.handleSubmit(data.get());
  }


  const isGroupName = (name: string) => !!groupsNameHash[name];
  return (
    <div className="card">
      <div className="card-body">
        <h4>Ввод данных для {municipality.name} ({stat_type.name}, {stat_type.unit})</h4>

        <form onSubmit={holdSubmit}>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className=" text-primary">
              <tr>
                <th></th>
                <th> {years[0].name}</th>
              </tr>
              </thead>
              <tbody>
              {ungroupedCultures.map((e, i) => <tr key={i}>
                <td>
                  <span
                    className={defineClassName("", "nested-row", () => !isGroupName(e.name))}>{!isGroupName(e.name) ? e.name.toLowerCase() : `${e.name} - всего`}</span>
                </td>
                <td>
                  <div className="form-group bmd-form-group">
                    <input name={`${e.id};${years[0].id}`} type="number" step="0.01" defaultValue={!!e.value && e.value.toString() || ""} className="form-control"/>
                  </div>
                </td>
              </tr>)}
              </tbody>
            </table>
          </div>
          <button>Отправить</button>

        </form>
      </div>
    </div>
  )
};

type CultureWithYear = Culture & { yearId: number };

class AddDataRequest {

  private readonly elements: HTMLInputElement[];
  private readonly culturesNamesHash: Record<string, string>;

  constructor(elements: HTMLFormControlsCollection, private props: AddDataTableProps)
  {
    this.elements = this.mutateToHtmlInputElement(elements);
    this.culturesNamesHash = this.getCulturesNamesHash(getUngroupedCultures(props.cultures.cultures));
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

  private extractDataFromElement(elements: HTMLInputElement[]): CultureWithYear[]
  {
    return elements
      .map(e =>
      {
        const [id, yearId] = e.name.split(";");
        return {id: +id, value: (e.value && +e.value) || undefined, yearId: +yearId, name: this.culturesNamesHash[id]};
      })
  }

  private groupByYear(elements: CultureWithYear[]): Record<string, Culture[]>
  {
    return elements.reduce((acc, c) =>
    {
      const culture: Culture = {id: +c.id, name: c.name, value: c.value};
      if (!acc[c.yearId]) acc[c.yearId] = [];
      acc[c.yearId] = acc[c.yearId].concat(culture);
      return acc;
    }, {} as Record<string, Culture[]>);
  }

  private getFullRequestData(elements: Record<string, Culture[]>): AddDataUpdateRequest
  {
    return {
      municipalityId: this.props.cultures.municipality.id,
      statTypeId: this.props.cultures.stat_type.id,
      data: Object.entries(elements).map(([k,v]) => ({yearId: +k, cultures: v}))
    }
  }


  private mutateToHtmlInputElement(elements: HTMLFormControlsCollection)
  {
    return Array
      .from(elements)
      .filter(e => e.nodeName === "INPUT") as HTMLInputElement[];
  }

  private getCulturesNamesHash(cultures: Culture[])
  {
    return cultures.reduce((acc,c) => (acc[c.id]=c.name, acc), {} as Record<string, string>);
  }
}
function getUngroupedCultures(cultures: {[key: string]: Culture[]})
{
  return Object.values(cultures).reduce((acc, cur) =>
  {
    acc = acc.concat(...Object.values(cur));
    return acc;
  }, [] as Culture[]);
}
export default connect()(AddDataTable)