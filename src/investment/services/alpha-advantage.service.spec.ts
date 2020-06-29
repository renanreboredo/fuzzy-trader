import { Test } from '@nestjs/testing';
import { AlphaAdvantageService } from './alpha-advantage.service';
import { InvestmentModule } from '../investment.module';
import { HttpService, HttpModule } from '@nestjs/common';

describe('AlphaAdvantageService', () => {
  let service: AlphaAdvantageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InvestmentModule, HttpModule],
      controllers: [],
      providers: [],
    }).compile();

    service = moduleRef.get<AlphaAdvantageService>(AlphaAdvantageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should build url for daily stock values correctly', () => {
    process.env = { ...process.env, ALPHA_ADVANTAGE_KEY: '123456' };
    expect(service.buildStockDailyUrl('ABEV3')).toEqual(
      'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ABEV3&apikey=123456',
    );
  });

  it('should build url for month stock values correctly', () => {
    process.env = { ...process.env, ALPHA_ADVANTAGE_KEY: '654321' };
    expect(service.buildStockMonthUrl('VALE3')).toEqual(
      'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=VALE3&apikey=654321',
    );
  });

  it('should build url for bitcoin crypto rating correctly', () => {
    process.env = { ...process.env, ALPHA_ADVANTAGE_KEY: 'AABBAABB' };
    expect(service.buildCryptoRatingUrl()).toEqual(
      'https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=AABBAABB',
    );
  });

  it('should build url for convertion from USD to BTC correctly', () => {
    process.env = { ...process.env, ALPHA_ADVANTAGE_KEY: 'BBAABBAA' };
    expect(service.buildUSDToBTCUrl()).toEqual(
      'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=BBAABBAA',
    );
  });
});
