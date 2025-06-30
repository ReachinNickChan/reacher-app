const Company = require('../models/companyModel');

// @desc    Get companies with optional filtering
// @route   GET /api/companies
// @access  Public (for now)
const getCompanies = async (req, res) => {
  try {
    const filter = {};
    const { industry, companyCountry, companyName, companyType } = req.query;

    if (companyName) {
      filter.companyName = { $regex: companyName, $options: 'i' };
    }
    if (industry) {
      filter.industry = { $regex: industry, $options: 'i' };
    }
    if (companyCountry) {
      filter.companyCountry = { $regex: companyCountry, $options: 'i' };
    }
    
    // **NEW LOGIC FOR MULTI-SELECT**
    // If companyType filter exists, add it to our query using the $in operator
    if (companyType && companyType.length > 0) {
      // The query parameter might be a single string or an array of strings.
      // We ensure it's always an array and use the $in operator.
      const types = Array.isArray(companyType) ? companyType : [companyType];
      filter.companyType = { $in: types };
    }

    const companies = await Company.find(filter);
    res.status(200).json(companies);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCompanies,
};