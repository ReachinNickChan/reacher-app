/**
 * @fileoverview Controller for handling 'People' data logic.
 * @description This file contains functions to get a list of people with filtering
 * and to get a single person by their ID.
 */

const People = require('../models/peopleModel');

// @desc    Get people with optional filtering
// @route   GET /api/people
// @access  Public (for now, will be protected later)
const getPeople = async (req, res) => {
    try {
        const filter = {};
        // Destructure all potential query parameters from the request
        const { fullName, title, companyName, seniority, primaryIndustry, subIndustry, country } = req.query;

        // Build the filter object dynamically based on provided queries
        if (fullName) {
            filter.fullName = { $regex: fullName, $options: 'i' }; // Case-insensitive search
        }
        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }
        if (companyName) {
            filter.companyName = { $regex: companyName, $options: 'i' };
        }
        if (seniority) {
            // Assumes seniority might be a multi-select filter from the frontend
            const seniorities = Array.isArray(seniority) ? seniority : [seniority];
            filter.seniority = { $in: seniorities };
        }
        if (primaryIndustry) {
            filter.primaryIndustry = { $regex: primaryIndustry, $options: 'i' };
        }
        if (subIndustry) {
            filter.subIndustry = { $regex: subIndustry, $options: 'i' };
        }
        if (country) {
            filter.country = { $regex: country, $options: 'i' };
        }

        const people = await People.find(filter);
        res.status(200).json(people);

    } catch (error) {
        console.error('Server Error in getPeople:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// @desc    Get a single person by their ID
// @route   GET /api/people/:id
// @access  Public (for now)
const getPersonById = async (req, res) => {
    try {
        const person = await People.findById(req.params.id);

        if (person) {
            res.status(200).json(person);
        } else {
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (error) {
        console.error('Server Error in getPersonById:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getPeople,
    getPersonById,
};