import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PageOptionsDto } from '../common/dto/page-options.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';
import { AdsPermissionService } from '../ads-permission/ads-permission.service';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly adsPermissionService: AdsPermissionService,
  ) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    if (createEventDto.type === 'ads') {
      const user = req.user as { countryCode: string };
      const { adsAlowed } = await this.adsPermissionService.getAdsPermission(
        user.countryCode,
      );
      if (!adsAlowed) {
        throw new ForbiddenException(
          'You are not allowed to create ads events',
        );
      }
    }

    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.eventsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    if (updateEventDto.type === 'ads') {
      const user = req.user as { countryCode: string };
      const { adsAlowed } = await this.adsPermissionService.getAdsPermission(
        user.countryCode,
      );
      if (!adsAlowed) {
        throw new ForbiddenException(
          'You are not allowed to update events to ads',
        );
      }
    }

    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
