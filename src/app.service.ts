import { EffectPayload } from './dto/text-effect-input.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  createTextEffect(textEffect: EffectPayload): string {
    console.log('textEffect', textEffect);
    return 'Hello World!';
  }
}
