import { Test } from '@nestjs/testing';
import { InvestmentsController } from './investments.controller';
import { RecommendationService } from './services/recommendation.service';
import { AlphaAdvantageService } from './services/alpha-advantage.service';
import { HttpModule } from '@nestjs/common';

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

  it('should suggest 3 best options for a certain amount of money', async () => {
    expect((await investmentsController.get(10000.0)).data).toEqual({
      conservative: {
        '1. open': '119.2900',
        '2. high': '119.7800',
        '3. low': '119.2700',
        '4. close': '119.7700',
        '5. volume': '253738',
      },
      moderate: {
        '1. open': '119.2900',
        '2. high': '119.7800',
        '3. low': '119.2700',
        '4. close': '119.7700',
        '5. volume': '253738',
      },
      aggressive: {
        '1. From_Currency Code': 'BTC',
        '2. From_Currency Name': 'Bitcoin',
        '3. To_Currency Code': 'USD',
        '4. To_Currency Name': 'United States Dollar',
        '5. Exchange Rate': '9155.72000000',
        '6. Last Refreshed': '2020-06-29 20:24:01',
        '7. Time Zone': 'UTC',
        '8. Bid Price': '9155.72000000',
        '9. Ask Price': '9155.73000000',
      },
    });
  });

  it('should return error response if amount is negative', async () => {
    expect((await investmentsController.get(-10.0)).message).toEqual(
      'Amount cannot be negative',
    );
    expect((await investmentsController.get(-10.0)).error).toBeTruthy();
  });
});
