import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';

describe('EventsService', () => {
  let service: EventsService;

  const mockEventRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: mockEventRepository,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new event', async () => {
      const createEventDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        type: 'app',
        priority: 1,
      };
      const event = new Event();
      mockEventRepository.create.mockReturnValue(event);
      mockEventRepository.save.mockResolvedValue(event);

      const result = await service.create(createEventDto);

      expect(mockEventRepository.create).toHaveBeenCalledWith(createEventDto);
      expect(mockEventRepository.save).toHaveBeenCalledWith(event);
      expect(result).toEqual(event);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of events', async () => {
      const pageOptionsDto: PageOptionsDto = {
        page: 1,
        take: 10,
        skip: 0,
      };
      const event = new Event();
      const events = [event];
      const itemCount = 1;
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      const expectedResult = new PageDto(events, pageMetaDto);

      mockEventRepository.findAndCount.mockResolvedValue([events, itemCount]);

      const result = await service.findAll(pageOptionsDto);

      expect(mockEventRepository.findAndCount).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single event by id', async () => {
      const eventId = 1;
      const event = new Event();
      mockEventRepository.findOneBy.mockResolvedValue(event);

      const result = await service.findOne(eventId);

      expect(mockEventRepository.findOneBy).toHaveBeenCalledWith({
        id: eventId,
      });
      expect(result).toEqual(event);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const eventId = 1;
      const updateEventDto: UpdateEventDto = { name: 'Updated Name' };
      mockEventRepository.update.mockResolvedValue({ affected: 1 });

      await service.update(eventId, updateEventDto);

      expect(mockEventRepository.update).toHaveBeenCalledWith(
        eventId,
        updateEventDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const eventId = 1;
      mockEventRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(eventId);

      expect(mockEventRepository.delete).toHaveBeenCalledWith(eventId);
    });
  });
});
