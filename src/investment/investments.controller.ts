import { Controller, Get, Param } from '@nestjs/common';
import { Response } from '../domain/Response';
import { RecommendationService } from '../services/recommendation';

@Controller('investments')
export class InvestmentsController {
  constructor(private recommendation: RecommendationService) {}

  @Get(':amount')
  async get(@Param('amount') amount: number): Promise<Response<any>> {
    if (amount < 0) {
      return new Response(
        {
          message: 'Amount cannot be negative',
        },
        true,
      );
    }
    return new Response({
      message: '',
      data: await this.recommendation.getRecommendation(amount),
    });
  }
}
