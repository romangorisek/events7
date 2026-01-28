import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const user = req.user as { countryCode: string };
    return this.eventTypesService.findAll(user.countryCode);
  }
}
