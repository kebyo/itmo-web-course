import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { booleanEnv } from './tools';

// TypeORM переменные
export const typeormBaseDirectory =
  process.env.TYPEORM_BASE_DIRECTORY || 'dist';
export const typeormHost = process.env.TYPEORM_HOST;
export const typeormPort = +process.env.TYPEORM_PORT || 5432;
export const typeormUser = process.env.TYPEORM_USERNAME;
export const typeormPassword = process.env.TYPEORM_PASSWORD;
export const typeormDatabase = process.env.TYPEORM_DATABASE;

console.log(
  `TypeORM configuration uses base directory '${typeormBaseDirectory}' in ${__filename}`,
);

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: typeormHost,
  port: typeormPort,
  username: typeormUser,
  password: typeormPassword,
  database: typeormDatabase,
  entities: [`${typeormBaseDirectory}/**/*.entity{.ts,.js}`],
  migrationsTableName: 'typeorm_migrations',
  migrations: [`${typeormBaseDirectory}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${typeormBaseDirectory}/migrations`,
  },
  logging: booleanEnv(process.env.DEBUG_SQL),
};

export default ormConfig;
