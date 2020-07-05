import { Controller, Get, Param } from '@nestjs/common';
import { FinancialAsset } from 'src/domain/financial-asset';
import { Response } from 'src/domain/Response';

@Controller()
export class WalletsController {
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<Response<FinancialAsset[]>> {
    const data = [];
    return {
      message: '',
      error: false,
      code: 200,
      data,
    };
  }
}
