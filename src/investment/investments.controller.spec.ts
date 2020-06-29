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

        investmentsController = moduleRef.get<InvestmentsController>(InvestmentsController);
    });

    it('should be defined', () => {
        expect(investmentsController).toBeDefined();
    });

    it('should sugest 3 best options for a certain amount of money', () => {
        expect(investmentsController.get(10.00)).toEqual({
            conservative: 1,
            moderate: 2,
            aggressive: 3
        });
    });
});
