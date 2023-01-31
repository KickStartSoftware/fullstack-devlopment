import mongoose from 'mongoose';

const CATEGORY_SCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim:true,
      require: [true, 'Category name is required'],
      minlength: [4, 'Category name cannot be less than 4 characters'],
      maxlength: [30, 'Category name cannot be more than 30 characters'],
    },
  },
  {
    timestamps: true,
  }
);

export const CATEGORY = mongoose.model('CATEGORY', CATEGORY_SCHEMA);
