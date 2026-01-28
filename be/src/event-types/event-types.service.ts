import { Injectable } from '@nestjs/common';

@Injectable()
export class EventTypesService {
  findAll() {
    return `This action returns all eventTypes`;
  }
}
