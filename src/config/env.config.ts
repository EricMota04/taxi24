import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [() => ({
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://root:example@mongo:27017/taxi24?authSource=admin',
  })],
});