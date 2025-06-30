// Import the mongoose library, which helps us create data blueprints
const mongoose = require('mongoose');

// Define the blueprint (Schema) for our User data
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, // This field cannot be empty
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each user must have a unique email address
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  companyWebsite: {
    type: String,
  },
  businessNumber: {
    type: String,
  },
  linkedinProfile: {
    type: String,
  },
  plan: {
    type: String,
    required: true,
    default: 'Free User', // New users start on the "Free User" plan
  },
  credits: {
    type: Number,
    required: true,
    default: 5, // "Free User" plan gets 5 credits
  },
}, {
  // This option automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create a Model from the schema. A model is what we use to actually
// find, create, update, and delete documents in our database.
const User = mongoose.model('User', userSchema);

// Export the User model so we can use it in other parts of our application
module.exports = User;