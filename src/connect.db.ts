const mongoose = require('mongoose');

export const connectDB = (url: string) => {
  mongoose.set('strictQuery', true)
  return mongoose.connect(url);
};
