import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { XRAY } from './shared/constant/rabitmq.queue';
import { MainDto } from './shared/dtos/xray.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(XRAY)
  eventHandler(@Payload() data: MainDto) {
    console.log(data);

  }
}
