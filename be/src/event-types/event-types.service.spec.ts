import { Test, TestingModule } from '@nestjs/testing';
import { EventTypesService } from './event-types.service';
import { AdsPermissionService } from '../ads-permission/ads-permission.service';

describe('EventTypesService', () => {
  let service: EventTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventTypesService,
        {
          provide: AdsPermissionService,
          useValue: {
            getAdsPermission: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventTypesService>(EventTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
