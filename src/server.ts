import express from 'express';
import { apiRoutes } from './routes/apiRoutes';
import sequelize from './db/sequelize/sequelizeConnection';
import errorHandler from './middlewares/errorHandler';

const app = express();

(async () => {
  await sequelize.authenticate();
})();

app.use('/api', apiRoutes(sequelize));
app.use(errorHandler)

export default app;
