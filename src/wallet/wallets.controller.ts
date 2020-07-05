import { Controller, Get, Param } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { FinancialAsset } from 'src/domain/financial-asset';
import { Response } from 'src/domain/response';
import { FinancialAssetsService } from 'src/services/financial-assets';

@Controller('wallet')
export class WalletsController {
  constructor(private financialAssetsService: FinancialAssetsService) {}

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<Response<FinancialAsset[]>> {
    const data = await this.financialAssetsService.getByUserId(id);
    console.log(data);
    return isEmpty(data)
      ? {
          message: 'No asset found to said user',
          error: true,
          code: 500,
          data,
        }
      : {
          message: '',
          error: false,
          code: 200,
          data,
        };
  }
}
