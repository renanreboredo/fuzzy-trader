import { InvestmentModule } from './investment/investment.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'app'),
    }),
    InvestmentModule,
    MongooseModule.forRoot(`mongodb+srv://root:${process.env.DATABASE_PASSWORD}@fuzzytrader.oaqab.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
