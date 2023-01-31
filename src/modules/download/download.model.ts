import mongoose, { Model } from 'mongoose';
import { IPackageModel } from '../package/package.model';

interface IDownload extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
}

export interface IDownloadSchema extends IDownload {}
export interface IDownloadModel extends Model<IDownload> {}

const DOWNLOAD_SCHEMA = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'USER',
      default: null,
    },
    package: {
      type: mongoose.Types.ObjectId,
      ref: 'PACKAGE',
      required: [true, 'package id is required'],
    },
  },
  {
    timestamps: true,
  }
);

DOWNLOAD_SCHEMA.post('save', async function () {
  const packageId = this.package;
  const software = await this.$model<IPackageModel>(
    'PACKAGE'
  ).findById(packageId)
  if (software) {
    software.numberOfDownloads = software.numberOfDownloads + 1;
    await software.save();
  }
});

export const DOWNLOAD = mongoose.model<IDownloadSchema, IDownloadModel>(
  'DOWNLOAD',
  DOWNLOAD_SCHEMA
);
