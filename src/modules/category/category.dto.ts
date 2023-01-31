export class CategoryDto {
  readonly name: string;
  constructor({ name = '' }: any) {
    this.name = name;
  }
}
