import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CharacterDto } from './dtos/test.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { tmpdir } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseInterceptors(FileInterceptor('file', { dest: tmpdir() }))
  async getHello(): Promise<string> {
    // console.log(query);
    return await this.appService.chatGPT();
  }

  @Get('/test2')
  async getHello2(@Body() date: CharacterDto): Promise<void> {
    console.log(date);
    // return await this.appService.chatGPT(query.prom2, query.prom3);
  }
}
