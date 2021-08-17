import { EffectPayload } from '../dto/text-effect-input.dto';

export interface ToStringable {
  toString(): string;
}

export class BaseParser {
  constructor(protected effectPayload: EffectPayload) {}

  protected createVideoInputString(): string {
    return `-i ${this.effectPayload.videoDetails.inputPath}`;
  }

  protected createVideoOutputString(): string {
    return this.effectPayload.videoDetails.outputPath;
  }
}
