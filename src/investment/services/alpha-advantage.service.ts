import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AlphaAdvantageService {
  // private CONSERVATIVE_STOCK_NAMES = ['ABEV', 'IBM'];
  // private MODERATE_STOCK_NAMES = ['VALE', 'ITUB'];

  constructor(private http: HttpService) {}

  async getStockValuesMonth(): Promise<{ conservative: any; moderate: any }> {
    const conservative = [
      (await this.http.get(this.buildStockMonthUrl('ABEV')).toPromise()).data,
      (await this.http.get(this.buildStockMonthUrl('IBM')).toPromise()).data,
    ];
    const moderate = [
      (await this.http.get(this.buildStockMonthUrl('VALE')).toPromise()).data,
      (await this.http.get(this.buildStockMonthUrl('ITUB')).toPromise()).data,
    ];
    return { conservative, moderate };
  }

  async getStockValuesDay(): Promise<{ conservative: any; moderate: any }> {
    const conservative = [
      (await this.http.get(this.buildStockDailyUrl('ABEV')).toPromise()).data,
      (await this.http.get(this.buildStockDailyUrl('IBM')).toPromise()).data,
    ];
    const moderate = [
      (await this.http.get(this.buildStockDailyUrl('VALE')).toPromise()).data,
      (await this.http.get(this.buildStockDailyUrl('ITUB')).toPromise()).data,
    ];
    return { conservative, moderate };
  }

  async getBitcoinCryptoRating() {
    return (await this.http.get(this.buildCryptoRatingUrl()).toPromise()).data;
  }

  async getUSDToBitcoinQuote() {
    return (await this.http.get(this.buildUSDToBTCUrl()).toPromise()).data;
  }

  buildStockMonthUrl(name: string) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${name}&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildStockDailyUrl(name: string) {
    return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${name}&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildCryptoRatingUrl() {
    return `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }

  buildUSDToBTCUrl() {
    return `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${process.env.ALPHA_ADVANTAGE_KEY}`;
  }
}
