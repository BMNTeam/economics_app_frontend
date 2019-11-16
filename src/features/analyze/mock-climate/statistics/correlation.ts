import {AnalyzeYearData} from "../../../../models/analyze-year-data";

export class Correlation {
  private readonly x: number[];
  private readonly y: number[];

  constructor(economic: AnalyzeYearData[], climate: AnalyzeYearData[])
  {
    const sameYearsEconomics = economic
      .filter(e => climate.some(c => e.year === c.year))
      .filter(v => !!v.data);
    this.x = sameYearsEconomics.map(e => e.data as number);
    this.y = climate.filter(c => sameYearsEconomics.some(x => x.year === c.year)).map(c => c.data as number);
  }

  getCoefficient()
  {
    const XYAverage = this.x.reduce((acc, c, i) => (acc += c * this.y[i], acc), 0 )/this.x.length;
    const XAverage = this.getAverage(this.x);
    const YAverage = this.getAverage(this.y);
    const XSquaredAverage = this.getAverage(this.x.map(x => x*x));
    const YSquaredAverage = this.getAverage(this.y.map(y => y*y));
    const sigmaX = Math.sqrt(XSquaredAverage - Math.pow(XAverage, 2));
    const sigmaY = Math.sqrt(YSquaredAverage - Math.pow(YAverage, 2));
    const coefficient = (XYAverage - XAverage * YAverage)/(sigmaX * sigmaY);
    return isNaN(coefficient) ? "Недостаточно данных" : Math.round(coefficient * 100)/ 100;
  }

  private getAverage(x: number[], length = this.x.length)
  {
    return x.reduce((acc, c) => (acc += c, acc), 0)/length;
  }
}