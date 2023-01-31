import 'dotenv/config';
import path from 'path';
import { config } from './config.js';
import { readFile } from 'fs/promises';
import { connectDB } from './connect.db.js';
import { CATEGORY } from './modules/category/category.model.js';

const start = async () => {
  try {
    await connectDB(config.mongo_uri);
    await CATEGORY.deleteMany();
    const jsonPath = path.join(process.cwd(), '/json/categories.json');
    const categories = JSON.parse(await readFile(jsonPath, 'utf8'));
    await CATEGORY.create(categories);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
