/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateEventDto } from '../src/events/dto/create-event.dto';
import { UpdateEventDto } from '../src/events/dto/update-event.dto';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  const createEventDto: CreateEventDto = {
    name: 'Test Event',
    description: 'Test Description',
    type: 'app',
    priority: 1,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send();
    jwtToken = loginResponse.body.access_token;
  });

  afterEach(async () => {
    await app.close();
  });

  it('/events (POST)', async () => {
    return request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createEventDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...createEventDto,
        });
      });
  });

  it('/events (GET)', async () => {
    await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createEventDto);

    return request(app.getHttpServer())
      .get('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              ...createEventDto,
            }),
          ]),
        );
      });
  });

  it('/events/:id (GET)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createEventDto);
    const eventId = postResponse.body.id;

    return request(app.getHttpServer())
      .get(`/events/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: eventId,
          ...createEventDto,
        });
      });
  });

  it('/events/:id (PATCH)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createEventDto);
    const eventId = postResponse.body.id;

    const updateEventDto: UpdateEventDto = { name: 'Updated Name' };

    return request(app.getHttpServer())
      .patch(`/events/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updateEventDto)
      .expect(200)
      .then(async () => {
        const getResponse = await request(app.getHttpServer())
          .get(`/events/${eventId}`)
          .set('Authorization', `Bearer ${jwtToken}`);
        expect(getResponse.body.name).toEqual(updateEventDto.name);
      });
  });

  it('/events/:id (DELETE)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/events')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createEventDto);
    const eventId = postResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/events/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/events/${eventId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});
