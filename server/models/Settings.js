const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: 'Sri Dhathrika Interiors',
    },
    phone: {
      type: String,
      default: '+91 9618096194',
    },
    email: {
      type: String,
      default: 'sridhathrikainteriors@gmail.com',
    },
    address: {
      type: String,
      default: 'Matrusree Nagar, Miyapur, Hyderabad, 500049',
    },
    instagram: {
      type: String,
      default: 'https://instagram.com',
    },
    facebook: {
      type: String,
      default: 'https://facebook.com',
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', SettingsSchema);
