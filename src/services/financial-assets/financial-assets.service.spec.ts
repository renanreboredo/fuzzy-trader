import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FinancialAssetsService } from '.';
import { FinancialAssetsSchema } from '../../domain/schemas/financial-asset.schema';

describe('FinancialAssetsService', () => {
  let financialAssetsService: FinancialAssetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: 'FinancialAsset', schema: FinancialAssetsSchema },
        ]),
      ],
      controllers: [],
      providers: [
        FinancialAssetsService,
        {
          provide: getModelToken('FinancialAsset'),
          useValue: FinancialAssetsSchema,
        },
      ],
    }).compile();

    financialAssetsService = moduleRef.get<FinancialAssetsService>(
      FinancialAssetsService,
    );
  });

  it('should be defined', () => {
    expect(financialAssetsService).toBeDefined();
  });
});
