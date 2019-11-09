import React from "react";
import {AnalyzeResult} from "../../../models/analyze-result";
import {AnalyzeYearData} from "../../../models/analyze-year-data"

interface AnalyzeGraphProps {
  data: AnalyzeResult;
  mockData?: AnalyzeYearData[];
}

export const AnalyzeGraphComponent: React.FC<AnalyzeGraphProps> = (props) =>
{
  const google = (window as any).google ? (window as any).google : {};
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages': ['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  let d: (number | undefined)[][] = props.data.graph_data
    .map(v => [v.year, (v.data && Math.round(v.data * 100)/100) || 0]);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.


  const getTempColumn = () =>
  {
    return d.map(v =>
    {
      if (props.mockData!.some(m => +m.year === v[0]))
      {
        return [...v, props.mockData!.find(m => +m.year === v[0])!.data];
      }
      return [...v, undefined];
    });
  };

  function drawChart()
  {

    // Create the data table.
    const data = new google.visualization.DataTable();
    const formatter = new google.visualization.NumberFormat({
      pattern: "0"
    });

    data.addColumn('number', 'Год');
    data.addColumn('number', `${props.data.stat_type.name} ${props.data.stat_type.unit}`);


    const options = {
      title: 'Результаты анализа',
      height: 500,
      theme: "material",
      hAxis: {
        title: "Год",
        format: "0",
        ticks: props.data.graph_data.map(v => v.year)
      },
      vAxis: {
        title: `${props.data.stat_type.name} ${props.data.stat_type.unit}`,
        format: ""
      },
      lineWidth: 4,
      pointSize: 10,
      legend: {position: 'bottom'}
    };

    if (props.mockData && props.mockData.length)
    {
      data.addColumn('number', 'Температура (С)');
      d = getTempColumn();
      (options as any).series = {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
      };
      (options as any).vAxes = {
        0: {title: `${props.data.stat_type.name} ${props.data.stat_type.unit}`},
        1: {title: "Температура (С)"}
      }

    }
    data.addRows(d);
    formatter.format(data, 0);

    const chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }

  return (
    <div id="chart_div">
    </div>
  )
};
