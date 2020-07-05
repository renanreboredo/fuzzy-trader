import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FinancialAssetsService } from '.';

describe('FinancialAssetsService', () => {
  let financialAssetsService: FinancialAssetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule],
      controllers: [],
      providers: [FinancialAssetsService],
    }).compile();

    financialAssetsService = moduleRef.get<FinancialAssetsService>(
      FinancialAssetsService,
    );
  });

  it('should be defined', () => {
    expect(financialAssetsService).toBeDefined();
  });
});
