import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationService } from './validation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ValidationService],
})
export class AppModule {}
