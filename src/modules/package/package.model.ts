import mongoose, { Model } from 'mongoose';

interface IPackage extends mongoose.Document {
  name: string;
  category: mongoose.Types.ObjectId;
  numberOfDownloads: number;
  win32url: string | null;
  win64url: string | null;
}

export interface IPackageSchema extends IPackage {}
export interface IPackageModel extends Model<IPackage> {}

export  const PACKAGE_SCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Package name is required'],
      minlength: [4, 'Package name cannot be less than 4 characters'],
      maxlength: [30, 'Package name cannot be more than 30 characters'],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'CATEGORY',
      required: [true, 'category is required'],
    },
    numberOfDownloads: {
      type: Number,
      default: 0,
      min: [0, 'Number of downloads cannot be less than 0'],
    },
    win32url: {
      type: String,
      default: null,
    },
    win64url: {
      type: String,
      default: null,
    },
    iconUrl: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export const PACKAGE = mongoose.model<IPackageSchema, IPackageModel>(
  'PACKAGE',
  PACKAGE_SCHEMA
);
