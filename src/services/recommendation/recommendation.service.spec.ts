import { Test } from '@nestjs/testing';
import { RecommendationService } from '.';
import { Record, RecordNotFound } from '../../domain/record';
import { InvestmentModule } from '../../modules/investment/investment.module';

describe('RecommendationService', () => {
  let recommendationService: RecommendationService;
  let recommendation;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [InvestmentModule],
      controllers: [],
      providers: [],
    }).compile();

    recommendationService = moduleRef.get<RecommendationService>(
      RecommendationService,
    );
  });

  it('should be defined', () => {
    expect(recommendationService).toBeDefined();
  });

  describe('#getRecommendation', () => {
    beforeEach(async () => {
      recommendation = await recommendationService.getRecommendation(
        10000.0,
        true,
      );
    });
    it('should recommend conservative value when amount is met', async () => {
      expect(recommendation.found).toBeTruthy();
      if (recommendation.found) {
        expect(recommendation.just.conservative).toEqual(
          new Record({
            '1. open': '119.2900',
            '2. high': '119.7800',
            '3. low': '119.2700',
            '4. close': '119.7700',
            '5. volume': '253738',
          }),
        );
      }
    });

    it('should recommend moderate value when amount is met', async () => {
      expect(recommendation.found).toBeTruthy();
      if (recommendation.found) {
        expect(recommendation.just.moderate).toEqual(
          new Record({
            '1. open': '119.2900',
            '2. high': '119.7800',
            '3. low': '119.2700',
            '4. close': '119.7700',
            '5. volume': '253738',
          }),
        );
      }
    });

    it('should recommend aggressive value when amount is met', async () => {
      expect(recommendation.found).toBeTruthy();
      if (recommendation.found) {
        expect(recommendation.just.aggressive).toEqual(
          new Record({
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
        );
      }
    });

    it('should not recommend anything when amount is very low', async () => {
      recommendation = await recommendationService.getRecommendation(
        10.0,
        true,
      );
      expect(recommendation.found).toBeFalsy();
      expect(recommendation).toEqual(new RecordNotFound());
    });
  });
});
