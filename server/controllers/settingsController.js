const Settings = require('../models/Settings.js');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await Settings.create({});
    }
    
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { studioName, phone, email, address, instagram, facebook, linkedin } = req.body;

    let settings = await Settings.findOne();
    
    // If no settings exist, create them
    if (!settings) {
      settings = await Settings.create({
        studioName,
        phone,
        email,
        address,
        instagram,
        facebook,
        linkedin,
      });
    } else {
      // Update existing settings
      if (studioName) settings.studioName = studioName;
      if (phone) settings.phone = phone;
      if (email) settings.email = email;
      if (address) settings.address = address;
      if (instagram) settings.instagram = instagram;
      if (facebook) settings.facebook = facebook;
      if (linkedin) settings.linkedin = linkedin;

      await settings.save();
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
