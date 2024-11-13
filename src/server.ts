import express from 'express';
import sequelize from './db/sequelize/sequelizeConnection';
import apiRouter from './routes/apiRoutes';
import { exceptionHandler } from './middlewares/exceptionHandler';
import { asyncHandler } from './middlewares/asyncHandler';
import { ErrorRequestHandler } from 'express-serve-static-core';

const app = express();
(async () => {
  await sequelize.authenticate();
})();

app.use(express.json());
app.use('/api', asyncHandler(apiRouter));
app.use(exceptionHandler as ErrorRequestHandler);

export default app;
