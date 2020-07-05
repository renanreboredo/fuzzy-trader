import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialAssetSchema } from 'src/domain/financial-asset.schema';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FinancialAsset', schema: FinancialAssetSchema },
    ]),
  ],
  controllers: [WalletsController],
  providers: [],
})
export class WalletModule {}
