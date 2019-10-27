import React from "react";
import {AnalyzeYearData} from "../../../models/analyze-year-data"

interface AnalyzeGraphProps {
  data: AnalyzeYearData[];
  mockData?: AnalyzeYearData[];
}

export const AnalyzeGraphComponent: React.FC<AnalyzeGraphProps> = (props) => {
  const google = (window as any).google ? (window as any).google : {};
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['line']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  let d: (number | undefined)[][] = props.data.map(v => [v.year, v.data || 0]);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.


  const getTempColumn = () => {
    return d.map(v => {
      if(props.mockData!.some(m => +m.year === v[0]))
      {
        return [...v, props.mockData!.find(m => +m.year === v[0])!.data];
      }
      return [...v, undefined];
      });
  };

  function drawChart() {

    // Create the data table.
    const data =  new google.visualization.DataTable();

    data.addColumn('number', 'Год');
    data.addColumn('number', 'Значение');


    const options = {
      title: 'Результаты анализа',
      height: 400,
      hAxis: {
        format: ""
      },
      vAxis: {
        format: ""
      },
      legend: { position: 'bottom' }
    };

    if(props.mockData && props.mockData.length)
    {
      data.addColumn('number', 'Температура');
      d = getTempColumn();
      (options as any).series = {
        0: {axis: 'Economics'},
        1: {axis: 'Climate'}
      }
    }
    data.addRows(d);

    const chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
  return(
    <div id="chart_div">
    </div>
  )
};
