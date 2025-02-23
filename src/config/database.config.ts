import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: MongooseModuleOptions = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/taxi24',
};
