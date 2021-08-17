import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export enum EffectType {
  TEXT = 'text',
  VIDEO_OVERLAY = 'video_overlay',
}

export class TextEffectPayload {
  @ApiProperty({
    description: 'The text to be used in the overlay effect',
    example: 'This is a test',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The size of the font',
    example: 24,
  })
  @IsNumber()
  fontSize: number;

  @ApiProperty({
    description: 'The color of the font, as a hex value',
    example: '0x00FF00',
  })
  @IsString()
  fontColor: string;
}

export class VideoDetails {
  @ApiProperty({
    description: 'Input path of the video',
  })
  @IsString()
  inputPath: string;

  @ApiProperty({
    description: 'Output path of the video',
  })
  @IsString()
  outputPath: string;

  @ApiProperty({
    description: 'Width (in pixels) of the video',
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'Height (in pixels) of the video',
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Duration (in seconds) of the video',
  })
  @IsNumber()
  duration: number;
}

export class EffectPayload {
  @ApiProperty({
    description: 'The type of effect to generate an ffmpeg string for',
    enum: Object.values(EffectType),
    example: EffectType.TEXT,
  })
  type: EffectType;

  @ApiProperty({
    description: 'The parameters for specific type of effect to be parsed',
  })
  @ValidateNested()
  effectParameters: TextEffectPayload;

  @ApiProperty({
    description: 'The video details, including path, duration, and resolution',
  })
  @ValidateNested()
  videoDetails: VideoDetails;

  @ApiProperty({
    description: 'The x-coordinate to place the effect',
    example: 1024,
  })
  @IsNumber()
  x: number;

  @ApiProperty({
    description: 'The y-coordinate to place the effect',
    example: 768,
  })
  @IsNumber()
  y: number;

  @ApiProperty({
    description: 'The start time (seconds) to place the effect',
    example: 12,
  })
  @IsNumber()
  startTime: number;

  @ApiProperty({
    description: 'The end time (seconds) to place the effect',
    example: 14,
  })
  @IsNumber()
  endTime: number;
}
