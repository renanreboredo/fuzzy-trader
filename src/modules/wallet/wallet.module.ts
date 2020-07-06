import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { FinancialAssetsSchema } from '../../domain/schemas/financial-asset.schema';
import { FinancialAssetsService } from '../../services/financial-assets';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FinancialAssets', schema: FinancialAssetsSchema },
    ]),
    UserModule,
  ],
  controllers: [WalletsController],
  providers: [FinancialAssetsService],
})
export class WalletModule {}
