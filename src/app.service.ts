import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CHARACTERS,
  Episode,
  madHares,
  psychoKittiesBackgroundInfo,
  psychoMollieBackgroundInfo,
} from './data';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async chatGPT(): Promise<string> {
    try {
      const result = await firstValueFrom(
        this.httpService.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: `Here is some PK backstory: ${psychoKittiesBackgroundInfo}, PM backstory: ${psychoMollieBackgroundInfo}, MH backstory: ${madHares}, here are some characters ${CHARACTERS}. Do not create any new characters.`,
              },
              {
                role: 'user',
                content: `Generate new story me like this ${Episode}`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer <CHATGPT_TOKEN_GOES_HERE>`,
            },
          },
        ),
      );

      console.log(result.data.choices[0].message.content);

      return result.data.choices[0].message.content;
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  }
}
