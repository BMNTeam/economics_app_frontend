import React from "react";


export class MockClimateTemperature {
  private data: Record<number, number[]>;

  constructor(private selectedMonths: number[], moved = false)
  {
    this.data = this.getData(moved);
  }

  getGraphData(): { data: number; year: number }[]
  {
    const average = this.getAverage(this.selectedMonths);
    return average.flatMap(a => Object.entries(a).map(([k, v]) => ({year: +k, data: v})))
  }

  getAverage(months: number[]): { [p: string]: number }[]
  {
    return Object.entries(this.data)
      .map(([year, values]) => ({[year]: this.getYearAverage(months.map(m => values[m]))}));
  }

  private getYearAverage(values: number[])
  {
    const sum = values.reduce((acc, c) => (acc = acc + c, acc), 0);
    return sum / values.length;
  }

  private getData(moved: boolean)
  {
    const data = {
      1999: [0.3, 2.1, 5.4, 11.6, 13.7, 22.1, 25.5, 23.9, 17.2, 11.3, 0.9, 2.5],
      2000: [-1.6, 1.5, 3.6, 14.2, 14.2, 20.3, 25.7, 23.7, 16.7, 8.8, 2.9, 0.2],
      2001: [-0.8, 0.4, 6.4, 11.6, 15.1, 19.9, 25.5, 24.4, 18.2, 9.7, 5.8, -2],
      2002: [-2.8, 4.4, 6.9, 9, 15.1, 9.5, 24.9, 21.4, 19.2, 11.6, 6, -7.4],
      2003: [-2.8, 4.4, 6.9, 9, 15.1, 19.5, 24.9, 21.4, 19.2, 11.6, 6, -7.4],
      2004: [0.4, 1, 5.8, 10.1, 15.6, 19.6, 22.1, 23.1, 17.8, 11.3, 5.4, 0.2],
      2005: [1.8, -3.5, 1.3, 10.6, 17.5, 19.7, 24.3, 24.2, 19.4, 10.6, 5.1, 2.9],
      2006: [-7.3, -3, 5, 11.2, 15.4, 22.6, 22.5, 27.4, 18.5, 12.5, 4.8, 0.6],
      2007: [2.5, -1.4, 3.6, 8.7, 17.9, 22.2, 25, 26, 19.9, 13.2, 2.5, -0.3],
      2008: [-7.8, -2.7, 7.9, 12.8, 14.9, 20, 24, 24.9, 17.2, 11.6, 5.8, -1.6],
      2009: [-2.5, 1.8, 4.3, 8, 14.9, 22.6, 24.9, 20.4, 17, 13.1, 5.8, 1.3],
      2010: [-3.6, -1.4, 3.5, 10.3, 17.5, 24.1, 26, 26.4, 19.9, 9.9, 8.5, 4.6],
      2011: [-2.7, -4.1, 2.3, 8.4, 16, 21, 26.1, 22.7, 17.5, 9.9, -1, 2.1],
      2012: [-3.7, -8.8, 1.3, 15.1, 19.6, 23, 23.9, 23.6, 19.1, 14.7, 6.3, -1.8],
      2013: [-0.6, 2.5, 5.4, 11.8, 19.1, 22, 23.6, 22.8, 15.7, 9.5, 5.9, -1.6],
      2014: [-2.1, -1.7, 5.3, 10.3, 18.8, 21.3, 24.6, 25.9, 12.8, 8.2, 2.6, 1.6],
      2015: [-1.5, 0.1, 4.3, 9.5, 16.7, 22.5, 24.6, 24.4, 21, 9.4, 5.8, 2.5],
      2016: [-2.4, 3.5, 5.8, 12.7, 16.6, 21.6, 23.6, 25.5, 16.8, 8.5, 3.5, -3.7],
      2017: [-2.4, -2, 5.7, 10.2, 15.6, 20.4, 25.1, 25.5, 20.1, 10.4, 4.7, 3.2],
      2018: [-1.7, 0.8, 4.2, 11.3, 18.6, 23.3, 26.1, 23.4, 19.2, 12.9, 2.4, 1]
    } as Record<number, number[]>;

    return moved ? this.getDataMovedOneYearBack(data) : data;
  }

  private getDataMovedOneYearBack(data: Record<number, number[]>)
  {
    return Object
      .keys(data)
      .map(k => ({[(+k + 1).toString()]: data[+k]}))
      .slice(0, -1)
      .reduce((acc, c) => {
        const [k, v]: [string, number[]] = Object.entries(c)[0];
        acc[+k] = v;
        return acc;
      }, {} as Record<number, number[]>);
  }
}

