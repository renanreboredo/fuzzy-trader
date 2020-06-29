import { Module } from '@nestjs/common';
import { InvestmentsController } from './investments.controller';

@Module({
    imports: [],
    controllers: [InvestmentsController],
    providers: [],
})
export class InvestmentModule { }
