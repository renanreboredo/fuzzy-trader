import { Controller, Get, Param } from '@nestjs/common';
import { FinancialAsset } from 'src/domain/financial-asset';
import { Response } from 'src/domain/response';
import { FinancialAssetsService } from 'src/services/financial-assets';

@Controller('wallet')
export class WalletsController {
  constructor(private financialAssetsService: FinancialAssetsService) {}

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<Response<FinancialAsset[]>> {
    const record = await this.financialAssetsService.getByUserId(id);
    return record.found
      ? new Response({
          message: '',
          data: record.just,
        })
      : new Response(
          {
            message: 'Found no asset to given user',
          },
          true,
        );
  }
}
