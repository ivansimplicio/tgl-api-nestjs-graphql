module.exports = {
  'type': process.env.DB_CONNECTION,
  'host': process.env.MYSQL_HOST,
  'port': +process.env.MYSQL_PORT,
  'username': process.env.MYSQL_USER,
  'password': process.env.MYSQL_PASSWORD,
  'database': process.env.DB_NAME,
  'synchronize': false,
  'logging': false,
  'migrationsTableName': 'migrations',
  'entities': [
    'dist/**/*.entity{.ts,.js}'
  ],
  'seeds': ['dist/src/database/seeders/**/*.js'],
  'migrations': ['./dist/src/database/migrations/*{.ts,.js}'],
  'cli': {
    'migrationsDir': './src/database/migrations/'
  }
}