const Admin = require('../models/Admin');

// =======================
// GET CURRENT ADMIN
// =======================

const getCurrentAdmin = async (req, res) => {
  try {

    const admin = await Admin.findById(req.admin._id)
      .select('-password');

    res.status(200).json({
      success: true,
      admin,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// =======================
// GET ALL ADMINS
// =======================

const getAdmins = async (req, res) => {
  try {

    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      admins,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// =======================
// DELETE ADMIN
// =======================

const deleteAdmin = async (req, res) => {
  try {

    const adminToDelete = await Admin.findById(req.params.id);

    if (!adminToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    // Prevent self delete
    if (
      adminToDelete._id.toString() === req.admin._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete yourself',
      });
    }

    // Prevent deleting last superadmin
    if (adminToDelete.role === 'superadmin') {

      const superAdmins = await Admin.countDocuments({
        role: 'superadmin'
      });

      if (superAdmins <= 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete last superadmin',
        });
      }
    }

    await adminToDelete.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getCurrentAdmin,
  getAdmins,
  deleteAdmin,
};