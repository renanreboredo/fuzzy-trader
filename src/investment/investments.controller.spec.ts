import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Record, RecordNotFound } from '../domain/record';
import { AlphaAdvantageService } from '../services/alpha-advantage';
import { RecommendationService } from '../services/recommendation';
import { InvestmentsController } from './investments.controller';

describe('InvestmentsController', () => {
  let investmentsController: InvestmentsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [InvestmentsController],
      providers: [AlphaAdvantageService, RecommendationService],
    }).compile();

    investmentsController = moduleRef.get<InvestmentsController>(
      InvestmentsController,
    );
  });

  it('should be defined', () => {
    expect(investmentsController).toBeDefined();
  });

  it('should return error response if amount is negative', async () => {
    const expected = await investmentsController.getRecommendation(-10.0);
    expect(expected.message).toEqual('Amount cannot be negative');
    expect(expected.error).toBeTruthy();
  });

  describe('#getRecommendation', () => {
    describe('not in simulation mode', () => {
      it('should return error if no option is found', async () => {
        jest
          .spyOn(RecommendationService.prototype, 'getRecommendation')
          .mockImplementation(async () => new RecordNotFound());
        const expected = await investmentsController.getRecommendation(10.0);
        expect(expected.message).toEqual(
          'No recommendation found for given amount',
        );
        expect(expected.error).toBeTruthy();
      });

      it('should suggest 3 best options for a certain amount of money', async () => {
        jest
          .spyOn(RecommendationService.prototype, 'getRecommendation')
          .mockImplementation(
            async () =>
              new Record({
                conservative: new Record({
                  '1. open': '119.2900',
                  '2. high': '119.7800',
                  '3. low': '119.2700',
                  '4. close': '119.7700',
                  '5. volume': '253738',
                }),
                moderate: new Record({
                  '1. open': '119.2900',
                  '2. high': '119.7800',
                  '3. low': '119.2700',
                  '4. close': '119.7700',
                  '5. volume': '253738',
                }),
                aggressive: new Record({
                  '1. From_Currency Code': 'BTC',
                  '2. From_Currency Name': 'Bitcoin',
                  '3. To_Currency Code': 'USD',
                  '4. To_Currency Name': 'United States Dollar',
                  '5. Exchange Rate': '9155.72000000',
                  '6. Last Refreshed': '2020-06-29 20:24:01',
                  '7. Time Zone': 'UTC',
                  '8. Bid Price': '9155.72000000',
                  '9. Ask Price': '9155.73000000',
                }),
              }),
          );
        const expected = (
          await investmentsController.getRecommendation(10000.0)
        ).data;
        if (expected.found) {
          expect(expected.just).toEqual({
            conservative: new Record({
              '1. open': '119.2900',
              '2. high': '119.7800',
              '3. low': '119.2700',
              '4. close': '119.7700',
              '5. volume': '253738',
            }),
            moderate: new Record({
              '1. open': '119.2900',
              '2. high': '119.7800',
              '3. low': '119.2700',
              '4. close': '119.7700',
              '5. volume': '253738',
            }),
            aggressive: new Record({
              '1. From_Currency Code': 'BTC',
              '2. From_Currency Name': 'Bitcoin',
              '3. To_Currency Code': 'USD',
              '4. To_Currency Name': 'United States Dollar',
              '5. Exchange Rate': '9155.72000000',
              '6. Last Refreshed': '2020-06-29 20:24:01',
              '7. Time Zone': 'UTC',
              '8. Bid Price': '9155.72000000',
              '9. Ask Price': '9155.73000000',
            }),
          });
        }
      });
    });
  });
});
