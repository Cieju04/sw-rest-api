import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { dbConnect } from '../config/db'
import authRouter from './routes/auth'
import { protectRoutes } from './middleware/protectRoutes'
import userRouter from './routes/user'

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(authRouter);

app.use('/user', protectRoutes, userRouter);

app.set('port', process.env.PORT || 8000);

export const startServer = async () => {
  try {
    await dbConnect()
      .then(connect => console.log(`MongoDB running on port ${connect.connections[0].port}`))
      .catch(err => console.log(err))
    app.listen(app.get('port'), () => {
      console.log(`Server is running on localhost:${app.get('port')}`);
          })
  }
  catch(err) {
    console.log(err);
  }
}