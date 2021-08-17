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
      it('returns a 201 success and the correct string', () => {
        const payload = {
          type: 'text',
          videoDetails: {
            inputPath: 'test_input1.mp4',
            outputPath: 'test_output1.mp4',
            width: 1920,
            height: 1080,
            duration: 60,
          },
          effectParameters: {
            text: 'I’m sOoOo good at this game! xD',
            fontColor: '0xFFFFFF',
            fontSize: 64,
          },
          startTime: 23,
          endTime: 40,
          x: 200,
          y: 100,
        } as any;
        return request(app.getHttpServer())
          .post('/')
          .send(payload)
          .expect(201)
          .expect({
            ffmpegString: `ffmpeg -i test_input1.mp4 -vf drawtext="enable='between(t,23.0,40.0)':text='I’m sOoOo good at this game! xD':fontcolor=0xFFFFFF:fontsize=64:x=200:y=100" test_output1.mp4`,
            details: {},
          });
      });

      it('returns a 201 success and the correct string with another set of parameters', () => {
        const payload = {
          type: 'text',
          videoDetails: {
            inputPath: 'test_input2.mp4',
            outputPath: 'test_output2.mp4',
            width: 1920,
            height: 1080,
            duration: 60,
          },
          effectParameters: {
            text: 'Brutal, Savage, Rekt',
            fontColor: '0x000000',
            fontSize: 48,
          },
          startTime: 0,
          endTime: 60,
          x: 0,
          y: 0,
        } as any;
        return request(app.getHttpServer())
          .post('/')
          .send(payload)
          .expect(201)
          .expect({
            ffmpegString: `ffmpeg -i test_input2.mp4 -vf drawtext="enable='between(t,0.0,60.0)':text='Brutal, Savage, Rekt':fontcolor=0x000000:fontsize=48:x=0:y=0" test_output2.mp4`,
            details: {},
          });
      });
    });

    describe('input params extend passed end time', () => {
      it('throws a HTTP 400: Invalid End Time', () => {
        const payload = {
          type: 'text',
          videoDetails: {
            inputPath: 'test_input3.mp4',
            outputPath: 'test_output3.mp4',
            width: 1920,
            height: 1080,
            duration: 60,
          },
          effectParameters: {
            text: 'RIP',
            fontColor: '0xFFFFFF',
            fontSize: 32,
          },
          startTime: 24,
          endTime: 75,
          x: 100,
          y: 200,
        } as any;
        return request(app.getHttpServer())
          .post('/')
          .send(payload)
          .expect(400)
          .expect({
            message: 'Error string: Invalid End Time',
          });
      });
    });

    describe('input params have invalid coordinates', () => {
      it('throws an HTTP 400: Invalid X,Y Coordinate', () => {
        const payload = {
          type: 'text',
          videoDetails: {
            inputPath: 'test_input4.mp4',
            outputPath: 'test_output4.mp4',
            width: 1920,
            height: 1080,
            duration: 60,
          },
          effectParameters: {
            text: 'RIP',
            fontColor: '0x7777777',
            fontSize: 48,
          },
          startTime: 24,
          endTime: 48,
          x: 100,
          y: 9999,
        } as any;
        return request(app.getHttpServer())
          .post('/')
          .send(payload)
          .expect(400)
          .expect({
            message: 'Error string: Invalid X,Y coordinate',
          });
      });
    });
  });
});
