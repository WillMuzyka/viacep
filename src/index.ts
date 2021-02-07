import 'reflect-metadata';
import 'dotenv/config';
import './database';

import cors from 'cors';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import AppError from './errors/AppError';
import routes from './routes';
import './container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err); //eslint-disable-line

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3333!');
});
