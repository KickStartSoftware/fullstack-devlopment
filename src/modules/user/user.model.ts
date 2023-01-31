import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserPayload {
  id: string;
  role: UserRole;
  email: string;
  username: string;
  isVerified: boolean;
}

interface IUSer extends mongoose.Document {
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  verifiedDate?: Date;
  verificationToken?: string | null;
  passwordToken?: string | null;
  passwordTokenExpirationDate?: Date | null;
}

interface IUserSchema extends IUSer {
  comparePassword: (canditatePassword: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserSchema> {}

const USER_SCHEMA = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please provide your email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Please provide your username'],
      minlength: [4, 'username must be longer than 4 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'password cannot be less than 6 characters'],
    },
    role: {
      type: String,
      enum: {
        values: [UserRole.ADMIN, UserRole.USER],
        message: 'Invalid user role',
      },
      default: UserRole.USER,
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedDate: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// index db with email and username
USER_SCHEMA.index({ email: 1, username: 1 }, { unique: true });

USER_SCHEMA.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

USER_SCHEMA.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

export const USER = mongoose.model<IUserSchema, IUserModel>(
  'USER',
  USER_SCHEMA
);
