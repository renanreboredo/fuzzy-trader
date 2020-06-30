import { Controller, Get, Param } from '@nestjs/common';
import { Response } from '../models/Response';
import { AlphaAdvantageService } from './services/alpha-advantage.service';
import { RecommendationService } from './services/recommendation.service';

@Controller('investments')
export class InvestmentsController {
  constructor(private recommendation: RecommendationService) {}

  @Get(':amount')
  async get(@Param('amount') amount: number): Promise<Response<any>> {
    if (amount < 0) {
      return {
        message: 'Amount cannot be negative',
        error: true,
        code: 500,
        data: {},
      };
    }
    return {
      message: '',
      error: false,
      code: 200,
      data: await this.recommendation.getRecommendation(amount),
    };
  }
}
