import React from "react";
import {AnalyzeYearData} from "../../../models/analyze-year-data";

interface AnalyzeGraphProps {
  data: AnalyzeYearData[];
}

export const AnalyzeGraphComponent: React.FC<AnalyzeGraphProps> = (props) => {
  const google = (window as any).google ? (window as any).google : {};
  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['line']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  const d = props.data.map(v => [v.year, v.data || 0]);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    // Create the data table.
    const data =  new google.visualization.DataTable();

    data.addColumn('number', 'Год');
    data.addColumn('number', 'Значение');
    data.addRows(d);

    const options = {
      title: 'Результаты анализа',
      height: "400",
      hAxis: {
        format: ""
      },
      vAxis: {
        format: ""
      },
      legend: { position: 'bottom' }
    };

    const chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Line.convertOptions(options));
  }
  return(
    <div id="chart_div">
      1234
    </div>
  )
};