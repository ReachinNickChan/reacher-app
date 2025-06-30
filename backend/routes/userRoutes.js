const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser // <-- Import the new function
} = require('../controllers/userController');

// When a POST request is made to the root ('/'), it will call the registerUser function
router.post('/', registerUser);

// --- NEW LOGIN ROUTE ---
// When a POST request is made to '/login', it will call the loginUser function
router.post('/login', loginUser);


module.exports = router;