import { Sequelize } from 'sequelize-typescript';
import User from './models/user';
import WordleHighscore from './models/wordleHighscore';

const { PG_DB, PG_USERNAME, PG_PASSWORD } = process.env;

const sequelize = new Sequelize({
  database: PG_DB!,
  dialect: 'postgres',
  username: PG_USERNAME!,
  password: PG_PASSWORD!,
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
