/**
 * @fileoverview Database seeder script.
 * @description This script connects to MongoDB, clears existing data in the
 * 'companies' and 'people' collections, and inserts new data from local files.
 * It's designed to be run from the command line to initialize the database.
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// --- Import Data Models ---
const Company = require('../models/companyModel');
const People = require('../models/peopleModel'); // <-- Import the new People model

// --- Import Data Files ---
// For a real-world scenario, you would convert your Excel sheets to JSON format
// and load them here. These are placeholders for now.
const companies = require('../data/companies.js'); // Your existing company data
const people = require('../data/people.js'); // You will create this file

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

const importData = async () => {
    try {
        // Clear existing data
        await Company.deleteMany();
        await People.deleteMany();
        console.log('Cleared existing data from Companies and People collections.');

        // Insert new data
        await Company.insertMany(companies);
        console.log('Company data has been successfully imported.');

        // --- These lines are now active ---
        await People.insertMany(people);
        console.log('People data has been successfully imported.');

        console.log('Data seeding complete!');
        process.exit(); // Exit with success
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1); // Exit with failure
    }
};

const destroyData = async () => {
    try {
        await Company.deleteMany();
        await People.deleteMany();
        console.log('All data has been destroyed.');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error}`);
        process.exit(1);
    }
};

// --- Script Execution Logic ---
// This allows you to run `node seeder.js -d` to destroy data.
const run = async () => {
    await connectDB();

    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
};

run();