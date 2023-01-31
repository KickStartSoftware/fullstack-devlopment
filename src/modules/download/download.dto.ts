export class DownloadDto {
  readonly packageIds: string[]
  constructor({ packageIds }: any) {
  this.packageIds = Array.isArray(packageIds) ? packageIds : [];
  }
}

export class DownloadQueryDto {
  public userId: string;
  constructor({ userId }: any) {
    this.userId = userId || '';
  }
}
