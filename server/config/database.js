const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    console.log('Connecting to MongoDB...');

    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        family: 4,
        serverSelectionTimeoutMS: 5000,
      }
    );

    console.log('MongoDB Connected');

    return conn;

  } catch (error) {

    console.error('FULL ERROR:', error);

    process.exit(1);
  }
};

module.exports = connectDB;