import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Effect201Response } from './dto/effect-201-response.dto';
import { EffectPayload } from './dto/text-effect-input.dto';
import { ValidationService } from './validation.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly validationService: ValidationService,
  ) {}

  @Post()
  @ApiBadRequestResponse({ description: 'Invalid input parameters' })
  @ApiCreatedResponse({
    description: 'Successfully created ffmpeg string',
    type: Effect201Response,
  })
  getTextEffect(@Body() effectPayload: EffectPayload): Effect201Response {
    this.validationService.validateEffectPayload(effectPayload);
    return this.appService.createTextEffect(effectPayload);
  }
}
