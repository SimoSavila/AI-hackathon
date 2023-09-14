import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async chatGPT(prom2: string, criteria: string): Promise<string[]> {

    return [criteria];
    //   try {
    //     const response = await firstValueFrom(
    //       this.httpService.post(
    //         'https://api.openai.com/v1/chat/completions',
    //         {
    //           model: 'gpt-3.5-turbo',
    //           messages: [
    //             {
    //               role: 'system',
    //               content: `Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.`,
    //             },
    //             {
    //               role: 'user',
    //               content: `Here is a JSON array of job titles. Return a JSON array of filtered titles which are ${criteria}. ${JSON.stringify(
    //                 gptInput,
    //               )}`,
    //             },
    //           ],
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer <YOUR_CHATGPT_KEY_HERE>`,
    //           },
    //         },
    //       ),
    //     );

    //     if (response.data.choices.length > 0) {
    //       try {
    //         const gptOutput = JSON.parse(
    //           response.data.choices[0].message.content,
    //         );
    //         for (const person of people)
    //           if (gptOutput.includes(person.positionTitle)) results.push(person);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
}
