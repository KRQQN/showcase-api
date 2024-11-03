import express from 'express';
import { apiRoutes } from './routes/apiRoutes';
import sequelize from './db/sequelize/sequelizeConnection';

const app = express();

(async ()=>{
  await sequelize.authenticate();

  app.use('/api', apiRoutes(sequelize));
})();


export default app;
