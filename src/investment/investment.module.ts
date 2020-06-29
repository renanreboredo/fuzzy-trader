import { Module, HttpModule, HttpService } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';
import { AlphaAdvantageService } from './services/alpha-advantage.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [InvestmentsController],
  providers: [AlphaAdvantageService],
})
export class InvestmentModule {}
