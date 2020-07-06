import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { AlphaAdvantageService } from '.';
import { Record, RecordNotFound } from '../../domain/record';
import {
  mockCryptoRating,
  mockIntradaySeries,
  mockMonthSeries,
} from '../req.mock';

describe('AlphaAdvantageService', () => {
  let service: AlphaAdvantageService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [],
      providers: [AlphaAdvantageService, Record],
    }).compile();

    service = moduleRef.get<AlphaAdvantageService>(AlphaAdvantageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('good url formation', () => {
    it('should build url for daily stock values correctly', () => {
      process.env = { ...process.env, ALPHA_ADVANTAGE_KEY: '123456' };
      expect(service.buildStockDailyUrl('ABEV3')).toEqual(
        'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=ABEV3&apikey=123456',
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

  describe('#getStockValuesMonth', () => {
    describe('not in simulation mode', () => {
      it('should return conservative and moderate values for the month from Alpha Advantage API', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: mockMonthSeries,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getStockValuesMonth();
        expect(expected).toEqual(
          new Record({
            conservative: [mockMonthSeries, mockMonthSeries],
            moderate: [mockMonthSeries, mockMonthSeries],
          }),
        );
      });

      it('should return record not found if API call fails', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: [],
            status: 500,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getStockValuesMonth();
        expect(expected).toEqual(new RecordNotFound());
      });
    });

    describe('in simulation mode', () => {
      it('should return conservative and moderate values for the month from mock values', async () => {
        const expected = await service.getStockValuesMonth(true);
        expect(expected).toEqual(
          new Record({
            conservative: [mockMonthSeries, mockMonthSeries],
            moderate: [mockMonthSeries, mockMonthSeries],
          }),
        );
      });
    });
  });

  describe('#getStockValuesDay', () => {
    describe('not in simulation mode', () => {
      it('should return conservative and moderate values intraday from Alpha Advantage API', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: mockIntradaySeries,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getStockValuesDay();
        expect(expected).toEqual(
          new Record({
            conservative: [mockIntradaySeries, mockIntradaySeries],
            moderate: [mockIntradaySeries, mockIntradaySeries],
          }),
        );
      });

      it('should return record not found if API call fails', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: [],
            status: 500,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getStockValuesDay();
        expect(expected).toEqual(new RecordNotFound());
      });
    });

    describe('in simulation mode', () => {
      it('should return conservative and moderate values for the month from mock values', async () => {
        const expected = await service.getStockValuesDay(true);
        expect(expected).toEqual(
          new Record({
            conservative: [mockIntradaySeries, mockIntradaySeries],
            moderate: [mockIntradaySeries, mockIntradaySeries],
          }),
        );
      });
    });
  });

  describe('#getBitcoinCryptoRating', () => {
    describe('not in simulation mode', () => {
      it('should return conservative and moderate values intraday from Alpha Advantage API', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: mockCryptoRating,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getBitcoinCryptoRating();
        expect(expected).toEqual(new Record(mockCryptoRating));
      });

      it('should return record not found if API call fails', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: [],
            status: 500,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getBitcoinCryptoRating();
        expect(expected).toEqual(new RecordNotFound());
      });
    });

    describe('in simulation mode', () => {
      it('should return conservative and moderate values for the month from mock values', async () => {
        const expected = await service.getBitcoinCryptoRating(true);
        expect(expected).toEqual(new Record(mockCryptoRating));
      });
    });
  });

  describe('#getUSDToBitcoinQuote', () => {
    describe('not in simulation mode', () => {
      it('should return conservative and moderate values intraday from Alpha Advantage API', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: mockCryptoRating,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getUSDToBitcoinQuote();
        expect(expected).toEqual(new Record(mockCryptoRating));
      });

      it('should return record not found if API call fails', async () => {
        jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
          of({
            data: [],
            status: 500,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
        const expected = await service.getUSDToBitcoinQuote();
        expect(expected).toEqual(new RecordNotFound());
      });
    });

    describe('in simulation mode', () => {
      it('should return conservative and moderate values for the month from mock values', async () => {
        const expected = await service.getBitcoinCryptoRating(true);
        expect(expected).toEqual(new Record(mockCryptoRating));
      });
    });
  });
});
