/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PageOptionsDto } from '../common/dto/page-options.dto';

describe('EventsController', () => {
  let controller: EventsController;

  const mockEventsService = {
    create: jest.fn((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn(() => ({ data: [], meta: {} })),
    findOne: jest.fn((id) => ({ id, name: 'Test Event' })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an event', () => {
    const dto: CreateEventDto = {
      name: 'Test',
      description: 'Test desc',
      type: 'app',
      priority: 1,
    };
    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
    expect(mockEventsService.create).toHaveBeenCalledWith(dto);
  });

  it('should find all events', () => {
    const pageOptions: PageOptionsDto = { skip: 0 };
    controller.findAll(pageOptions);
    expect(mockEventsService.findAll).toHaveBeenCalledWith(pageOptions);
  });

  it('should find one event', () => {
    const id = '1';
    controller.findOne(id);
    expect(mockEventsService.findOne).toHaveBeenCalledWith(+id);
  });

  it('should update an event', () => {
    const id = '1';
    const dto: UpdateEventDto = { name: 'Updated' };
    controller.update(id, dto);
    expect(mockEventsService.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should remove an event', () => {
    const id = '1';
    controller.remove(id);
    expect(mockEventsService.remove).toHaveBeenCalledWith(+id);
  });
});
