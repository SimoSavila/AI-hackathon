import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CHARACTERS,
  MHInfo,
  PKInfo,
  PMInfo,
  previousEpisodes,
  shortSummary,
} from './data';
import { firstValueFrom } from 'rxjs';
import { StoryDto } from './dtos/story.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async genStory(): Promise<StoryDto> {
    const content = JSON.stringify({
      backgroundInfo: [PKInfo, MHInfo, PMInfo],
      characters: CHARACTERS,
      instructions: `Dont create new charaters!`,
      previousEpisodes: previousEpisodes,
      mainCharaters: [CHARACTERS[0], CHARACTERS[1]],
    });

    const requestData = {
      model: 'gpt-4', // Adjust the model name as per the latest model from OpenAI
      messages: [
        {
          role: 'system',
          content: content,
        },
        {
          role: 'user',
          content: `Generate a new episode based on last stories ${previousEpisodes}, use at least 2 charaters in each story and one mainCharater, give detailed scene description and tone`,
        },
      ],
    };

    try {
      const result = await firstValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          requestData,
          {
            headers: {
              Authorization: `Bearer <API KEY>`,
            },
          },
        ),
      );
      return new StoryDto({ story });
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  }

  async tweakStory(input: string): Promise<string> {
    const content = JSON.stringify({
      backgroundInfo: [PKInfo, MHInfo, PMInfo],
      characters: CHARACTERS,
      previousEpisodes: previousEpisodes.pop(),
      mainCharaters: [CHARACTERS[0], CHARACTERS[1]],
    });
    const requestData = {
      model: 'gpt-4', // Adjust the model name as per the latest model from OpenAI
      messages: [
        {
          role: 'system',
          content: content,
        },
        {
          role: 'user',
          content: input,
        },
      ],
    };

    try {
      const result = await firstValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          requestData,
          {
            headers: {
              Authorization: `Bearer <API-TOKEN>`,
            },
          },
        ),
      );
      const story = result.data.choices[0].message.content;
      previousEpisodes.push(story);
      return story;
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  }
}
