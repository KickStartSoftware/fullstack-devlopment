import 'dotenv/config';
import path from 'path';
import { config } from './config.js';
import { readFile } from 'fs/promises';
import { connectDB } from './connect.db.js';
import { PACKAGE } from './modules/package/package.model.js';

const start = async () => {
  try {
    await connectDB(config.mongo_uri);
    await PACKAGE.deleteMany();
    const jsonPath = path.join(process.cwd(), '/json/softwares.json');
    const softwares = JSON.parse(await readFile(jsonPath, 'utf8'));
    await PACKAGE.create(softwares);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
