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
  Logger,
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
  private readonly logger = new Logger(EventsController.name);

  constructor(
    private readonly eventsService: EventsService,
    private readonly adsPermissionService: AdsPermissionService,
  ) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    this.logger.log('Creating a new event');
    if (createEventDto.type === 'ads') {
      await this.thowForbiddenIfAdsNotAllowed(
        req.user as { countryCode: string },
        'You are not allowed to create ads events',
      );
    }

    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    this.logger.log('Finding all events');
    return this.eventsService.findAll(pageOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Finding event with id ${id}`);
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    this.logger.log(`Updating event with id ${id}`);
    if (updateEventDto.type === 'ads') {
      await this.thowForbiddenIfAdsNotAllowed(
        req.user as { countryCode: string },
        'You are not allowed to update events to ads',
      );
    }

    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Removing event with id ${id}`);
    return this.eventsService.remove(+id);
  }

  private async thowForbiddenIfAdsNotAllowed(
    user: { countryCode: string },
    msg: string,
  ): Promise<void> {
    const { adsAllowed } = await this.adsPermissionService.getAdsPermission(
      user.countryCode,
    );
    if (!adsAllowed) {
      throw new ForbiddenException(msg);
    }
  }
}
