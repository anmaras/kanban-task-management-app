import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

//library that handle async try catch
// so no need to write try catch for every async controller
import 'express-async-errors';

//db and authenticateUser
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use(cors());
app.use(express.json());

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
