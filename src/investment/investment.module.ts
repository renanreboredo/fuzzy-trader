import { Module, HttpModule } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';
import { AlphaAdvantageService } from './services/alpha-advantage.service';
import { RecommendationService } from './services/recommendation.service';

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
