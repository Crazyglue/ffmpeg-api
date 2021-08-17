import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Effect201Response {
  @ApiProperty({
    description: 'The ffmpeg string',
  })
  @IsString()
  ffmpegString: string;

  @ApiProperty({
    description: 'Additional details about the generated string',
  })
  @IsOptional()
  details?: Record<string, any>;
}
