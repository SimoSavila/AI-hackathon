import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CHARACTERS, MHInfo, PKInfo, PMInfo, shortSummary } from './data';
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
          content: `Generate a new story for me like this: ${shortSummary}`,
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

      console.log(result.data.choices[0].message.content);
      console.log(result.data.error);

      const story = result.data.choices[0].message.content;
      return new StoryDto({ story });
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  }
}
