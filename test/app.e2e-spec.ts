import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ (GET)', () => {
    describe('input params are successful', () => {
      it('returns a 200 success and the correct string', () => {
        const payload = {};
        return request(app.getHttpServer())
          .post('/')
          .send(payload)
          .expect(201)
          .expect('Hello World!');
      });
    });

    describe('input params extend passed end time', () => {
      it('throws a HTTP 400: Invalid End Time', () => {});
    });

    describe('input params have invalid coordinates', () => {
      it('throws an HTTP 400: Invalid X,Y Coordinate', () => {});
    });
  });
});
