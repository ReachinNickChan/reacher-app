/**
 * @fileoverview Defines the API routes for 'Company' data, now protected.
 */

const express = require('express');
const router = express.Router();
const { getCompanies } = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware'); // <-- Import protect middleware

// We add 'protect' as the second argument.
// Any request to this route must now pass the authentication check.
router.get('/', protect, getCompanies);

module.exports = router;