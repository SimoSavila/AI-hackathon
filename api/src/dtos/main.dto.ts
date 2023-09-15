import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PromptDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly promt1!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly prom2!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly prom3!: string;
}
