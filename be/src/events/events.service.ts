import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}
  create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Event>> {
    console.log('what the f is the sortBy thing??', pageOptionsDto.sortBy);
    const findManyOptions: FindManyOptions<Event> = {
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.take,
    };
    if (pageOptionsDto.sortBy) {
      findManyOptions.order = {
        [pageOptionsDto.sortBy]: pageOptionsDto.order,
      };
    }

    if (pageOptionsDto.filters) {
      const filter = `%${pageOptionsDto.filters}%`;
      findManyOptions.where = [
        { name: ILike(filter) },
        { description: ILike(filter) },
        { type: ILike(filter) },
      ];
    }

    const [entities, itemCount] =
      await this.eventRepository.findAndCount(findManyOptions);

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventRepository.update(id, updateEventDto);
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }
}
