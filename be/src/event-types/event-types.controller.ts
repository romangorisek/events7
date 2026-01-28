import { Controller, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('event-types')
export class EventTypesController {
  private readonly logger = new Logger(EventTypesController.name);

  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    this.logger.log('Finding all event types');
    const user = req.user as { countryCode: string };
    return this.eventTypesService.findAll(user.countryCode);
  }
}
