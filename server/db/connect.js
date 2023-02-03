import mongoose from 'mongoose';

//this option remove mongoose warning
mongoose.set('strictQuery', false);

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log('Connected to DataBase Success'))
    .catch((err) => console.log(`Error connect to DataBase`, err));
};

export default connectDB;
