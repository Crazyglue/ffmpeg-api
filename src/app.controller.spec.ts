import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EffectPayload, EffectType } from './dto/text-effect-input.dto';
import { ValidationService } from './validation.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ValidationService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a ffmpeg string', () => {
      const payload: EffectPayload = {
        type: EffectType.TEXT,
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
        endTime: 26,
        x: 100,
        y: 200,
      };
      expect(appController.getTextEffect(payload)).toEqual({
        ffmpegString: `ffmpeg -i test_input3.mp4 -vf drawtext="enable='between(t,24.0,26.0)':text='RIP':fontcolor=0xFFFFFF:fontsize=32:x=100:y=200" test_output3.mp4`,
        details: {},
      });
    });
  });
});
