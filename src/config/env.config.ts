import dotenv from 'dotenv';
import { cleanEnv, str, port, bool } from 'envalid';

dotenv.config();

export const envConfig = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ default: 5000 }),
  DB_HOST: str(),
  DB_PORT: port({ default: 5432 }),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  DB_DATABASE_URL: str(),
  DB_SSL: bool({ default: false }),
  CLIENT_URL: str(),
});