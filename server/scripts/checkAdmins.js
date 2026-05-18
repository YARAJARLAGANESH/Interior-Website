const connectDB = require('../config/database');
const Admin = require('../models/Admin');

(async () => {
  await connectDB();
  const admins = await Admin.find({}).lean();
  console.log('Admins in DB:', admins);
  process.exit(0);
})();
