import { EffectPayload } from '../dto/text-effect-input.dto';
import { BaseParser, ToStringable } from './base.parser';

export class TextEffectParser extends BaseParser implements ToStringable {
  constructor(effectPayload: EffectPayload) {
    super(effectPayload);
  }

  private createEnableParameter(): string {
    const { startTime, endTime } = this.effectPayload;

    const startTimeDecimal = startTime.toFixed(1);
    const endTimeDecimal = endTime.toFixed(1);
    const between = ['t', startTimeDecimal, endTimeDecimal].join(',');
    return `enable='between(${between})'`;
  }

  private createTextParameter(): string {
    const { text } = this.effectPayload.effectParameters;
    return `text='${text}'`;
  }

  private createFontColorParameter(): string {
    const { fontColor } = this.effectPayload.effectParameters;
    return `fontcolor=${fontColor}`;
  }

  private createFontSizeParameter(): string {
    const { fontSize } = this.effectPayload.effectParameters;
    return `fontsize=${fontSize}`;
  }

  private createXParameter(): string {
    const { x } = this.effectPayload;
    return `x=${x}`;
  }

  private createYParameter(): string {
    const { y } = this.effectPayload;
    return `y=${y}`;
  }

  private createDrawTextParameters(): string {
    const drawTextParameters = [
      this.createEnableParameter(),
      this.createTextParameter(),
      this.createFontColorParameter(),
      this.createFontSizeParameter(),
      this.createXParameter(),
      this.createYParameter(),
    ].join(':');

    return `drawtext="${drawTextParameters}"`;
  }

  private buildFfmpgString(): string {
    return [
      'ffmpeg',
      this.createVideoInputString(),
      '-vf',
      this.createDrawTextParameters(),
      this.createVideoOutputString(),
    ].join(' ');
  }

  toString(): string {
    return this.buildFfmpgString();
  }
}
