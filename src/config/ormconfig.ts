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
  url: 'postgres://wwipvhydqrznjf:c651484b7b0f245d2d5fbcabfef4aee1735f50523dc87724178461679b2de96c@ec2-34-230-153-41.compute-1.amazonaws.com:5432/d4ng003d76qfc7',
  type: 'postgres',
  // host: typeormHost,
  // port: typeormPort,
  // username: typeormUser,
  // password: typeormPassword,
  // database: typeormDatabase,
  entities: [`${typeormBaseDirectory}/**/*.entity{.ts,.js}`],
  migrationsTableName: 'typeorm_migrations',
  migrations: [`${typeormBaseDirectory}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `${typeormBaseDirectory}/migrations`,
  },
  ssl: true,
  logging: booleanEnv(process.env.DEBUG_SQL),
};

export default ormConfig;
