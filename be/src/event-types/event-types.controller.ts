import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventTypesService.findAll();
  }
}
