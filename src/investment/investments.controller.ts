import { Controller, Get, Param } from '@nestjs/common';
import { Response } from '../models/Response';

@Controller('investments')
export class InvestmentsController {
    constructor() { }
    @Get(':amount')
    get(@Param('amount') amount: number): Response<any> {
        if (amount < 0) {
            return {
                message: 'Amount cannot be negative',
                error: true,
                code: 500,
                data: {}
            };    
        }
        return {
            message: '',
            error: false,
            code: 200,
            data: {
                conservative: 1,
                moderate: 2,
                aggressive: 3
            }
        };
    }
}