import React from "react";
import {AnalyzeYearData} from "../../../../models/analyze-year-data";
import {Statistics} from "./statistics";

interface ShortStatisticsProps {
  economic: AnalyzeYearData[];
  climate?: AnalyzeYearData[];
  name: string;
}

export const ShortStatisticsComponent: React.FC<ShortStatisticsProps> = (props) =>
{
  const economicsStat = new Statistics(props.economic.filter(e => !!e.data).map(v => v.data || 0));
  const climateStat = props.climate && new Statistics(props.climate.filter(e => !!e.data).map(v => v.data || 0));
  const stats = [{stat: economicsStat, color: 'green'}, {stat: climateStat, color: 'red'}];

  const getTD = (label: string, s: {stat?: Statistics, color: string}, fn: () => number, i: number) => {
    return <td key={i} style={{color: s.color}}>{label}: <b>{Math.round(fn()*100) / 100}</b></td>
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>{props.name}</th>
          {climateStat && <th>Температура</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          {stats.map((s, i) => s.stat && getTD('Среднее арифметическое', s, () => s.stat!.getAverage(), i))}
        </tr>
        <tr>
          {stats.map((s, i) => s.stat && getTD('Ошибка среднего', s, () => s.stat!.getAverageError(), i))}
        </tr>
        <tr>
          {stats.map((s, i) => s.stat && getTD('Стандартное отклонение', s, () => s.stat!.getSigma(), i))}
        </tr>
        <tr>
          {stats.map((s, i) => s.stat && getTD('Дисперсия', s, () => s.stat!.getDispersion(), i))}
        </tr>
        <tr>
          {stats.map((s, i) => s.stat && getTD('Коэффициент вариации(%)', s, () => s.stat!.getVariationCoefficient(), i))}
        </tr>
      </tbody>
    </table>
  )
};