import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("MONGODB_URI is undefined. Please check your .env file.");
      process.exit(1);
    }

    await mongoose.connect(uri);
    const connection = mongoose.connection;

    if (connection.listeners('connected').length === 0) {
      connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });
    }

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running. ' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
  }
};

export default dbConnect;
