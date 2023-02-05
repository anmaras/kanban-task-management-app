import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
const app = express();
dotenv.config();

//library that handle async try catch
// so no need to write try catch for every async controller
import 'express-async-errors';

//library that handle logs
import morgan from 'morgan';

//db and authenticateUser
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

//show the logs
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
