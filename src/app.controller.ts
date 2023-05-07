import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mogus')
  getHello(): string {
    const res = this.appService.getHello();
    return res;
  }

  @Get(':id')
  intersno(@Param() params: number): string {
    console.log(params);
    return `mogu mogu`;
  }
}
