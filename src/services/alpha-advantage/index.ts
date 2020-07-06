import { HttpService, Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Maybe, Record, RecordNotFound } from '../../domain/record';
import {
  mockBitcoinExchangeRate,
  mockCryptoRating,
  mockIntradaySeries,
  mockMonthSeries,
} from '../req.mock';

@Injectable()
export class AlphaAdvantageService {
  // private CONSERVATIVE_STOCK_NAMES = ['ABEV', 'IBM'];
  // private MODERATE_STOCK_NAMES = ['VALE', 'ITUB'];

  constructor(private http: HttpService) {}

  async getStockValuesMonth(
    simulation = false,
  ): Promise<Maybe<{ conservative: any; moderate: any }>> {
    if (simulation) {
      return new Record({
        conservative: [mockMonthSeries, mockMonthSeries],
        moderate: [mockMonthSeries, mockMonthSeries],
      });
    } else {
      const conservative = [
        (await this.http.get(this.buildStockMonthUrl('ABEV')).toPromise()).data,
        (await this.http.get(this.buildStockMonthUrl('IBM')).toPromise()).data,
      ];
      const moderate = [
        (await this.http.get(this.buildStockMonthUrl('VALE')).toPromise()).data,
        (await this.http.get(this.buildStockMonthUrl('ITUB')).toPromise()).data,
      ];
      return !conservative.filter(isEmpty).length ||
        !moderate.filter(isEmpty).length
        ? new Record({ conservative, moderate })
        : new RecordNotFound();
    }
  }

  async getStockValuesDay(
    simulation = false,
  ): Promise<Maybe<{ conservative: any; moderate: any }>> {
    if (simulation) {
      return new Record({
        conservative: [mockIntradaySeries, mockIntradaySeries],
        moderate: [mockIntradaySeries, mockIntradaySeries],
      });
    } else {
      const conservative = [
        (await this.http.get(this.buildStockDailyUrl('ABEV')).toPromise()).data,
        (await this.http.get(this.buildStockDailyUrl('IBM')).toPromise()).data,
      ];
      const moderate = [
        (await this.http.get(this.buildStockDailyUrl('VALE')).toPromise()).data,
        (await this.http.get(this.buildStockDailyUrl('ITUB')).toPromise()).data,
      ];
      return !conservative.filter(isEmpty).length ||
        !moderate.filter(isEmpty).length
        ? new Record({ conservative, moderate })
        : new RecordNotFound();
    }
  }

  async getBitcoinCryptoRating(simulation = false): Promise<Maybe<any>> {
    if (simulation) {
      return new Record(mockCryptoRating);
    } else {
      const rating = (
        await this.http.get(this.buildCryptoRatingUrl()).toPromise()
      ).data;
      return !isEmpty(rating) ? new Record(rating) : new RecordNotFound();
    }
  }

  async getUSDToBitcoinQuote(simulation = false): Promise<Maybe<any>> {
    if (simulation) {
      return new Record(mockBitcoinExchangeRate);
    } else {
      const quote = (await this.http.get(this.buildUSDToBTCUrl()).toPromise())
        .data;

      return !isEmpty(quote) ? new Record(quote) : new RecordNotFound();
    }
  }

  buildStockMonthUrl(name: string): string {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${name}&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildStockDailyUrl(name: string): string {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildCryptoRatingUrl(): string {
    return `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildUSDToBTCUrl(): string {
    return `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }
}
