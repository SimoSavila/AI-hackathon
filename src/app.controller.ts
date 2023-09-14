import { Body, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PromptDTO } from './dtos/main.dto';
import { CharacterDto } from './dtos/test.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(@Query('query') query: PromptDTO): Promise<string[]> {
    console.log(query);
    return await this.appService.chatGPT(query.prom2, query.prom3);
  }

  @Get('/test2')
  async getHello2(@Body() date: CharacterDto): Promise<void> {
    console.log(date);
    // return await this.appService.chatGPT(query.prom2, query.prom3);
  }
}
