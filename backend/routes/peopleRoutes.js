/**
 * @fileoverview Defines the API routes for 'People' data, now protected.
 */

const express = require('express');
const router = express.Router();
const { getPeople, getPersonById } = require('../controllers/peopleController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import protect middleware

// Apply the 'protect' middleware to both routes
router.get('/', protect, getPeople);
router.get('/:id', protect, getPersonById);

module.exports = router;