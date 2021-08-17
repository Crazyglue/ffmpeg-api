import { Effect201Response } from './dto/effect-201-response.dto';
import { EffectPayload } from './dto/text-effect-input.dto';
import { Injectable } from '@nestjs/common';
import { ParserFactory } from './parsers/parser.factory';

@Injectable()
export class AppService {
  createTextEffect(textEffect: EffectPayload): Effect201Response {
    const textEffectParser = ParserFactory.createParser(
      textEffect.type,
      textEffect,
    );
    const ffmpegString = textEffectParser.toString();

    return {
      ffmpegString,
      details: {}, // Add additional details if we want to
    };
  }
}
