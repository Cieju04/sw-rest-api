import mongoose from 'mongoose';

export const dbConnect = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};