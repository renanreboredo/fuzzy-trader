import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvestmentModule } from './investment/investment.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    WalletModule,
    InvestmentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/app'),
    }),
    MongooseModule.forRoot(
      `mongodb+srv://root:${process.env.DATABASE_PASSWORD}@fuzzytrader.oaqab.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
