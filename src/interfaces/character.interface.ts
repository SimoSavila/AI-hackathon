export interface Character {
  readonly name: string;
  readonly description: string;
  readonly type: 'MH' | 'PM' | 'PK';
}
