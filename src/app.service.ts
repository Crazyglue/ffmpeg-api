import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTextEffect(): string {
    return 'Hello World!';
  }
}
