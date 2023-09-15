export class StoryDto {
  readonly story: string;

  constructor(args: { story: string }) {
    this.story = args.story;
  }
}
