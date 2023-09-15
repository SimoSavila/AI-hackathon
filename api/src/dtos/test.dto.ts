import { Expose } from 'class-transformer';

export class CharacterDto {
  @Expose()
  readonly name!: string;

  @Expose()
  readonly age!: string;
}
