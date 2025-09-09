import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
  host: string;
  port: number;
}

export const appConfigValidationSchema = Joi.object({
  APP_HOST: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(8000),
});

export default registerAs('app', () => ({
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 10),
}));
