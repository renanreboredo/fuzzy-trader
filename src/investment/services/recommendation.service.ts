import { Injectable } from '@nestjs/common';
import { AlphaAdvantageService } from './alpha-advantage.service';
import {
  mockMonthSeries,
  mockIntradaySeries,
  mockCryptoRating,
  mockBitcoinExchangeRate,
} from './req.mock';

@Injectable()
export class RecommendationService {
  constructor(private alphaAdvantage: AlphaAdvantageService) {}
  async getRecommendation(amount: number) {
    const conservative = this.chooseBestOption(
      [mockIntradaySeries, mockIntradaySeries],
      [mockMonthSeries, mockMonthSeries],
    );
    const moderate = this.chooseBestOption(
      [mockIntradaySeries, mockIntradaySeries],
      [mockMonthSeries, mockMonthSeries],
    );
    const aggressive =
      Number(mockCryptoRating['Crypto Rating (FCAS)']['4. fcas score']) > 749 &&
      Number(
        mockBitcoinExchangeRate['Realtime Currency Exchange Rate'][
          '8. Bid Price'
        ],
      ) <= amount
        ? mockBitcoinExchangeRate['Realtime Currency Exchange Rate']
        : {};
    return {
      conservative:
        Number(conservative['1. open']) <= amount ? conservative : {},
      moderate: Number(moderate['1. open']) <= amount ? moderate : {},
      aggressive,
    };
  }

  chooseBestOption(day: any, month: any) {
    const first = this.calculateRecommendationIndex(day[0], month[0]);
    const second = this.calculateRecommendationIndex(day[1], month[1]);
    return first.index < second.index ? first.stock : second.stock;
  }

  calculateRecommendationIndex(day, month): { index: number; stock: any } {
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
