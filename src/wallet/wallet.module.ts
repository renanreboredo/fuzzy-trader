import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [],
  controllers: [WalletsController],
  providers: [],
})
export class WalletModule {}
