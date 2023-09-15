import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CharacterDto } from './dtos/test.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { tmpdir } from 'os';
import { StoryDto } from './dtos/story.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/gen-story')
  @UseInterceptors(FileInterceptor('file', { dest: tmpdir() }))
  async genStory(): Promise<StoryDto> {
    // console.log(query);
    return await this.appService.genStory();
  }

  @Get('/test2')
  async getHello2(@Body() date: CharacterDto): Promise<void> {
    console.log(date);
    // return await this.appService.chatGPT(query.prom2, query.prom3);
  }
}
