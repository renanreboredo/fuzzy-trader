import { Test } from '@nestjs/testing';
import { WalletModule } from './wallet.module';
import { WalletsController } from './wallets.controller';

describe('WalletsController', () => {
  let walletsController: WalletsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WalletModule],
      controllers: [],
      providers: [],
    }).compile();

    walletsController = moduleRef.get<WalletsController>(WalletsController);
  });

  it('should be defined', () => {
    expect(walletsController).toBeDefined();
  });
});
