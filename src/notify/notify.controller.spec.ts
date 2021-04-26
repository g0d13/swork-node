import { Test, TestingModule } from '@nestjs/testing';
import { NotifyGateway } from './notify.gateway';

describe('NotifyController', () => {
  let controller: NotifyGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifyGateway],
    }).compile();

    controller = module.get<NotifyGateway>(NotifyGateway);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
