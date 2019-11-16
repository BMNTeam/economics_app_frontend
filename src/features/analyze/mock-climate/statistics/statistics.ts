export class Statistics{
  private readonly squaredAverageValue: number;

  constructor(public value: number[])
  {
    this.squaredAverageValue = this.getSquaredAverageValue();
  }

  getAverage(x = this.value)
  {
    return x.reduce((acc, c) => (acc += c, acc), 0)/this.value.length;
  }

  getSigma()
  {
    return Math.sqrt(this.getDispersion());
  }

  getDispersion()
  {
    return this.squaredAverageValue - Math.pow(this.getAverage(), 2)
  }

  getAverageError()
  {
    return this.getSigma()/Math.sqrt(this.value.length);
  }

  getVariationCoefficient()
  {
    return this.getSigma()/this.getAverage();
  }

  private getSquaredAverageValue()
  {
    return this.getAverage(this.value.map(x => x*x))
  }
}