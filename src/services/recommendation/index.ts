import { Injectable } from '@nestjs/common';
import { Recommendation } from '../../domain/recommendation';
import { Maybe, Record, RecordNotFound } from '../../domain/record';
import { AlphaAdvantageService } from '../alpha-advantage';

@Injectable()
export class RecommendationService {
  conservative: Maybe<any>;
  moderate: Maybe<any>;
  aggressive: Maybe<any>;

  constructor(private alphaAdvantage: AlphaAdvantageService) {}

  async getRecommendation(
    amount: number,
    simulation = false,
  ): Promise<Maybe<Recommendation>> {
    const day = await this.alphaAdvantage.getStockValuesDay(simulation);
    const month = await this.alphaAdvantage.getStockValuesMonth(simulation);
    const cryptoRating = await this.alphaAdvantage.getBitcoinCryptoRating(
      simulation,
    );
    const exchangeRate = await this.alphaAdvantage.getUSDToBitcoinQuote(
      simulation,
    );

    if (day.found && month.found) {
      this.conservative = this.chooseBestConservativeOption(
        amount,
        day.just.conservative,
        month.just.conservative,
      );
      this.moderate = this.chooseBestModerateOption(
        amount,
        day.just.moderate,
        month.just.moderate,
      );
    }

    if (cryptoRating.found && exchangeRate.found) {
      this.aggressive = this.chooseBestAggressiveOption(
        amount,
        cryptoRating.just,
        exchangeRate.just,
      );
    }

    return this.conservative.found ||
      this.moderate.found ||
      this.aggressive.found
      ? new Record({
          conservative: this.conservative,
          moderate: this.moderate,
          aggressive: this.aggressive,
        })
      : new RecordNotFound();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  private chooseBestConservativeOption(
    amount: number,
    day: any,
    month: any,
  ): Maybe<any> {
    const conservative = this.chooseBestOption({
      day,
      month,
    });
    return Number(conservative['1. open']) <= amount
      ? new Record(conservative)
      : new RecordNotFound();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  private chooseBestModerateOption(
    amount: number,
    day: any,
    month: any,
  ): Maybe<any> {
    const moderate = this.chooseBestOption({
      day,
      month,
    });
    return Number(moderate['1. open']) <= amount
      ? new Record(moderate)
      : new RecordNotFound();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  private chooseBestAggressiveOption(
    amount: number,
    cryptoRating: any,
    exchangeRate: any,
  ): Maybe<any> {
    return Number(cryptoRating['Crypto Rating (FCAS)']['4. fcas score']) >
      749 &&
      Number(exchangeRate['Realtime Currency Exchange Rate']['8. Bid Price']) <=
        amount
      ? new Record(exchangeRate['Realtime Currency Exchange Rate'])
      : new RecordNotFound();
  }

  private chooseBestOption({ day, month }: { day: any; month: any }): any {
    const first = this.calculateRecommendationIndex({
      day: day[0],
      month: month[0],
    });
    const second = this.calculateRecommendationIndex({
      day: day[1],
      month: month[1],
    });
    return first.index < second.index ? first.stock : second.stock;
  }

  private calculateRecommendationIndex({
    day,
    month,
  }: {
    day;
    month;
  }): { index: number; stock: any } {
    const monthSeries = month['Monthly Time Series'];
    const seriesIndex = [...Array(10).keys()].map((_, index) => {
      const data = monthSeries[Object.keys(monthSeries)[index]];
      return (data['3. low'] / data['2. high']) * data['5. volume'];
    });
    return {
      index: seriesIndex[0] / seriesIndex[9],
      stock:
        day['Time Series (5min)'][Object.keys(day['Time Series (5min)'])[0]],
    };
  }
}
