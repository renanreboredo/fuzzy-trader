import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialAsset } from '../domain/financial-asset';
import { Response } from '../domain/response';
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

  @Post(':id')
  async addToWallet(
    @Param('id') id: string,
    @Body() financialAsset: FinancialAsset,
  ): Promise<Response<FinancialAsset>> {
    const record = await this.financialAssetsService.addAsset(
      id,
      financialAsset,
    );
    return record.found
      ? new Response({
          message: '',
          data: record.just,
        })
      : new Response(
          {
            message: "Couldn't add asset to user",
            data: null,
          },
          true,
        );
  }
}
