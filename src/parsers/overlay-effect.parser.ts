import { ToStringable } from './base.parser';
import { EffectPayload } from 'src/dto/text-effect-input.dto';
import { BaseParser } from './Base.parser';

// TODO: Implement the whole video-overlay parser
export class OverlayEffectParser extends BaseParser implements ToStringable {
  constructor(effectPayload: EffectPayload) {
    super(effectPayload);
  }

  private buildFfmpgString(): string {
    return [
      'ffmpeg',
      this.createVideoInputString(),
      '-vf',
      this.createVideoOutputString(),
    ].join(' ');
  }

  toString(): string {
    return this.buildFfmpgString();
  }
}
