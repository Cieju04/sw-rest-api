import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import redis from 'redis';
import { promisify } from 'util';
import { dbConnect } from './config/db'
import { protectRoutes } from './middleware/protectRoutes'
import authRouter from './routes/auth'
import resourcesRouter from './routes/resources'
import userRouter from './routes/user'

const app = express();

const client = redis.createClient({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(authRouter)
app.use('/user', protectRoutes, userRouter)
app.use('/resources', protectRoutes, resourcesRouter)

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