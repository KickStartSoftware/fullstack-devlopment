import mongoose, { Model } from 'mongoose';
import { PACKAGE_SCHEMA } from '../package/package.model';

interface ICollection extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  name: string;
  packages: typeof PACKAGE_SCHEMA[];
}

export interface ICollectionSchema extends ICollection {}
export interface ICollectionModel extends Model<ICollection> {}

const COLLECTION_SCHEMA = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'USER',
      required: [true, 'Please provide a user for this collection'],
    },
    name: {
      type: String,
      trim: true,
      require: [true, 'Collection name is required'],
      minlength: [4, 'Collection name cannot be less than 4 characters'],
      maxlength: [30, 'Collection name cannot be more than 30 characters'],
    },
    packages: [PACKAGE_SCHEMA],
  },
  {
    timestamps: true,
  }
);

COLLECTION_SCHEMA.index({ user: 1, name: 1 }, { unique: true });

export const COLLECTION = mongoose.model<ICollectionSchema, ICollectionModel>(
  'COLLECTION',
  COLLECTION_SCHEMA
);
