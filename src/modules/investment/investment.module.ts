import { HttpModule, Module } from '@nestjs/common';
import { AlphaAdvantageService } from '../../services/alpha-advantage';
import { RecommendationService } from '../../services/recommendation';
import { InvestmentsController } from './investments.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [InvestmentsController],
  providers: [AlphaAdvantageService, RecommendationService],
})
export class InvestmentModule {}
