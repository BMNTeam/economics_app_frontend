import React, {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {StatComponent, StatComponentProps} from "../../components/shared/stat/stat.component";
import {ActionPayload} from "../../shared";
import {GlobalStore} from "../../store";
import {getStatistics} from "./home.actions";
import {connect} from "react-redux";
const stats: StatComponentProps[] = [
  {value: "331", icon: "store", category: "Всего записей", color: "card-header-info"},
  {value: "1233", icon: "info", category: "Посевная площадь за год", color: "card-header-danger"},
  {value: "1233", icon: "info", category: "Валовой сбор за год", color: "card-header-success"},
  {value: "1233", icon: "info", category: "Урожайность за год", color: "card-header-warning"},
];
type HomeProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
const HomeComponent: React.FC<HomeProps> = (props) => {
  useEffect(() => {
    props.getStatistics();
  }, []);
  if (!props.statistics)
  {
    return (<div></div>);
  }
  const {last_data, short_statistics} = props.statistics;
  const additional = {text: "По данным за последний год", icon: "update"};
  return(
    <div>
      <div className="row">

          <div className="col-lg-3 col-md-6 col-sm-6">
            <StatComponent icon="store" category="Всего записпей" value={`${short_statistics.total}`} color="card-header-info" additional={additional}/>
          </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <StatComponent icon="info" category="Посевная площадь за год" value={`${short_statistics.cultivation_area_sum} тыс. гектар`} color="card-header-danger" additional={additional}/>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <StatComponent icon="info" category="Валовой сбор за год" value={`${short_statistics.gross_fee_sum} тыс. тонн`} color="card-header-success" additional={additional}/>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <StatComponent icon="info" category="Урожайность за год" value={`${Math.round(short_statistics.productivity_sum * 100) / 100}`} color="card-header-warning" additional={additional}/>
        </div>
      </div>

      <div className="card">
        <div className="card-header card-header-info">
          <h4 className="card-title">Последние добавленные записи</h4>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="text-info">
            <tr>
              <th>Год</th>
              <th>Муниципальное образование</th>
              <th>Культура</th>
              <th>Показатель</th>
              <th>Значение</th>
            </tr>
            </thead>
            <tbody>
            {last_data.map((e, i) =>
              <tr key={e.id}>
                <td>{e.year}</td>
                <td>{e.municipality}</td>
                <td>{e.culture}</td>
                <td>{e.stat_type}</td>
                <td>{e.value}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
};

const mapStateToProps = (state: GlobalStore) => ({
  statistics: state.home.statistics
});

const mapDispatchToProps = (dispatch: ThunkDispatch<GlobalStore, null, ActionPayload<void>>) => ({
  getStatistics: () => dispatch(getStatistics())
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
