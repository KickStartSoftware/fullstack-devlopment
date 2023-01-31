export class CollectionDto {
  readonly userId: string;
  readonly name: string;
  readonly packageIds: string[];
  constructor({ userId, name, packageIds }: any) {
    this.name = name;
    this.userId = userId;
    this.packageIds = Array.isArray(packageIds) ? packageIds : [];
  }

  constructQuery() {
    const query: any = {};

    // search by userId
    if (this.userId) {
      query.user = this.userId;
    }

    // search by name
    if (this.name) {
      query.name = {
        $regex: this.name,
        $options: 'i',
      };
    }

    return query;
  }
}
