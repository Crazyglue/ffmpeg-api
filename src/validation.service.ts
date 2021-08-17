import { EffectPayload, VideoDetails } from './dto/text-effect-input.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  private validateDimensions(
    videoDetails: VideoDetails,
    x: number,
    y: number,
  ): void {
    const { width, height } = videoDetails;
    if (x > width || y > height) {
      throw new BadRequestException({
        message: 'Error string: Invalid X,Y coordinate',
      });
    }
  }

  private validateTimestamps(
    videoDetails: VideoDetails,
    startTime: number,
    endTime: number,
  ): void {
    const { duration } = videoDetails;

    if (endTime > duration) {
      throw new BadRequestException({
        message: 'Error string: Invalid End Time',
      });
    }

    if (startTime > duration) {
      throw new BadRequestException({
        message: 'Error string: Invalid Start Time',
      });
    }
  }

  public validateEffectPayload(effectPayload: EffectPayload): void {
    this.validateDimensions(
      effectPayload.videoDetails,
      effectPayload.x,
      effectPayload.y,
    );
    this.validateTimestamps(
      effectPayload.videoDetails,
      effectPayload.startTime,
      effectPayload.endTime,
    );
  }
}
