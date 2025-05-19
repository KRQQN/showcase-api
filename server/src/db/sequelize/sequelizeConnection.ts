import { Sequelize } from 'sequelize-typescript';
import User from './models/user';
import WordleHighscore from './models/wordleHighscore';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'postgres',
  DB_USER = 'postgres',
  DB_PASSWORD = 'pw'
} = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  repositoryMode: true,
  models: [
    User,
    WordleHighscore
  ]
});

sequelize
  .addHook('afterConnect', () => {
    console.log('Connected to database');
  })
  .sync({ force: true });

export default sequelize;
