import { BaseParser } from './Base.parser';
import { EffectType, EffectPayload } from './../dto/text-effect-input.dto';
import { TextEffectParser } from './text-effect.parser';
import { OverlayEffectParser } from './overlay-effect.parser';
import { BadRequestException } from '@nestjs/common';

const factoryMap = {
  [EffectType.TEXT]: TextEffectParser,
  [EffectType.VIDEO_OVERLAY]: OverlayEffectParser, // TODO: user an actual implementation
};

export class ParserFactory {
  static createParser(
    type: EffectType,
    effectPayload: EffectPayload,
  ): BaseParser {
    const ParserClass = factoryMap[type];

    if (!ParserClass) {
      throw new BadRequestException({ message: 'Invalid payload type' });
    }
    return new ParserClass(effectPayload);
  }
}
