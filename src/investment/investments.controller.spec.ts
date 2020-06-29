import { Test } from '@nestjs/testing';
import { InvestmentsController } from './investments.controller';

describe('InvestmentsController', () => {
  let investmentsController: InvestmentsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [InvestmentsController],
      providers: [],
    }).compile();

    investmentsController = moduleRef.get<InvestmentsController>(
      InvestmentsController,
    );
  });

  it('should be defined', () => {
    expect(investmentsController).toBeDefined();
  });

  it('should suggest 3 best options for a certain amount of money', () => {
    expect(investmentsController.get(10.0).data).toEqual({
      conservative: 1,
      moderate: 2,
      aggressive: 3,
    });
  });

  it('should return error response if amount is negative', () => {
    expect(investmentsController.get(-10.0).message).toEqual(
      'Amount cannot be negative',
    );
    expect(investmentsController.get(-10.0).error).toBeTruthy();
  });
});
