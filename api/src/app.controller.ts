import {
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StoryDto } from './dtos/story.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/gen-story')
  async genStory(): Promise<StoryDto> {
    return await this.appService.genStory();
  }

  @Get('/edit-story')
  async getHello2(@Query('question') input: string): Promise<string> {
    return await this.appService.tweakStory(input);
  }
}
