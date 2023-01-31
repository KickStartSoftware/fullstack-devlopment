export class PackageDto {
  readonly name: string;
  readonly category: string;
  readonly win32url: string | null;
  readonly win64url: string | null;
  readonly numberOfDownloads: number;

  constructor({ name, category, win32url, win64url, numberOfDownloads }: any) {
    this.name = name || '';
    this.category = category || '';
    this.win32url = win32url || null;
    this.win64url = win64url || null;
    this.numberOfDownloads = numberOfDownloads ? Number(numberOfDownloads) : 0;
  }
}
