import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvestmentModule } from './investment/investment.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    WalletModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/app'),
    }),
    InvestmentModule,
    MongooseModule.forRoot(
      `mongodb+srv://root:${process.env.DATABASE_PASSWORD}@fuzzytrader.oaqab.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
