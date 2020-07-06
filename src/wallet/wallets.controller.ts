import { Controller, Get, Param } from '@nestjs/common';
import { FinancialAsset } from '../domain/financial-asset';
import { Response } from '../domain/response-generic';
import { FinancialAssetsService } from '../services/financial-assets';

@Controller('wallet')
export class WalletsController {
  constructor(private financialAssetsService: FinancialAssetsService) {}

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<Response<FinancialAsset[]>> {
    const record = await this.financialAssetsService.getByUserId(id);
    return record.found
      ? new Response({
          message: '',
          data: record.just,
        })
      : new Response(
          {
            message: 'Found no asset to given user',
            data: [],
          },
          true,
        );
  }
}
