import express from 'express';
import sequelize from './db/sequelize/sequelizeConnection';
import errorHandler from './middlewares/errorHandler';
import apiRouter from './routes/apiRoutes';

const app = express();

(async () => {
  await sequelize.authenticate();
})();

app.use('/api', apiRouter);
app.use(errorHandler)

export default app;
