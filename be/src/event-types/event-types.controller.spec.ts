import { Test, TestingModule } from '@nestjs/testing';
import { EventTypesController } from './event-types.controller';
import { EventTypesService } from './event-types.service';
import { AdsPermissionService } from '../ads-permission/ads-permission.service';

describe('EventTypesController', () => {
  let controller: EventTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTypesController],
      providers: [
        {
          provide: EventTypesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: AdsPermissionService,
          useValue: {
            getAdsPermission: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventTypesController>(EventTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
