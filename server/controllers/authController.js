const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const loginAdmin = async (req, res) => {
  try {

    console.log("REQ BODY:", req.body);

    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const admin = await Admin.findOne({ email });

    console.log("ADMIN FOUND:", admin);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const registerAdmin = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with that email",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
};