const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin.js');
const connectDB = require('../config/database.js');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nPlease change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
