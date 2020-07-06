import { Controller, Get, Param } from '@nestjs/common';
import { Response } from '../domain/response-generic';
import { RecommendationService } from '../services/recommendation';

@Controller('investments')
export class InvestmentsController {
  constructor(private recommendation: RecommendationService) {}

  @Get(':amount')
  async getRecommendation(
    @Param('amount') amount: number,
  ): Promise<Response<any>> {
    if (amount < 0) {
      return new Response(
        {
          message: 'Amount cannot be negative',
          data: {},
        },
        true,
      );
    }
    const record = await this.recommendation.getRecommendation(amount);
    if (record.found) {
      return new Response({
        message: '',
        data: record.just,
      });
    } else {
      return new Response(
        {
          message: 'No recommendation found for given amount',
          data: {},
        },
        true,
      );
    }
  }

  @Get(':amount/simulate')
  async getRecommendationSimulation(
    @Param('amount') amount: number,
  ): Promise<Response<any>> {
    if (amount < 0) {
      return new Response(
        {
          message: 'Amount cannot be negative',
          data: {},
        },
        true,
      );
    }

    const record = await this.recommendation.getRecommendation(amount, true);

    if (record.found) {
      return new Response({
        message: '',
        data: {
          conservative: record.just.conservative.found
            ? record.just.conservative.just
            : {},
          moderate: record.just.moderate.found ? record.just.moderate.just : {},
          aggressive: record.just.aggressive.found
            ? record.just.aggressive.just
            : {},
        },
      });
    } else {
      return new Response(
        {
          message: 'No recommendation found for given amount',
          data: {},
        },
        true,
      );
    }
  }
}
