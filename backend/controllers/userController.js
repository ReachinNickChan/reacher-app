const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  // Get the data from the request body
  const {
    fullName,
    email,
    password,
    companyName,
    companyWebsite,
    businessNumber,
    linkedinProfile
  } = req.body;

  // Basic validation
  if (!fullName ||!email ||!password) {
    res.status(400).json({
      message: 'Please add all required fields'
    });
    return;
  }

  // Check if user already exists
  const userExists = await User.findOne({
    email
  });

  if (userExists) {
    res.status(400).json({
      message: 'User already exists'
    });
    return;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user in the database
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    companyName,
    companyWebsite,
    businessNumber,
    linkedinProfile,
  });

  // If user was created successfully, send back the user's info and a token
  if (user) {
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: 'Invalid user data'
    });
  }
};

// --- NEW LOGIN FUNCTION ---
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Check if user exists and if the password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser, // <-- Add this export
};