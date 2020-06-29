import { Controller, Get, Param } from '@nestjs/common';

@Controller('investments')
export class InvestmentsController {
    constructor() { }
    @Get(':amount')
    get(@Param('amount') amount: number) {
        return {
            conservative: 1,
            moderate: 2,
            aggressive: 3
        };
    }
}
