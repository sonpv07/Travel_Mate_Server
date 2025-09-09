import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface PostgresConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

export const postgresConfigValidationSchema = Joi.object({
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
});

export default registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  user: process.env.POSTGRES_USER,
  pass: process.env.POSTGRES_PASSWORD,
  name: process.env.POSTGRES_DATABASE,
}));
