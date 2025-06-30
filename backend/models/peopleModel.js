/**
 * @fileoverview Mongoose schema and model for the 'People' collection.
 * @description This file defines the data structure for individual contacts in the database.
 * The schema is based on the 'People_master_list_for_programmer1.xlsx' document.
 */

const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    // Personal & Contact Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    title: { type: String },
    email: { type: String },
    phone: { type: String },
    linkedinUrl: { type: String },

    // Professional Details
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    seniority: { type: String },
    function: { type: String }, // 'function' is a keyword, but acceptable as a property name
    primaryIndustry: { type: String },
    subIndustry: { type: String },

    // Location
    city: { type: String },
    state: { type: String },
    country: { type: String },

    // Associated Company Reference
    // This links a person to a document in the 'companies' collection.
    // It's a best practice for relational data in MongoDB.
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },

    // Data Source & Timestamps
    source: { type: String },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a virtual property 'fullName' for convenience, though it's also stored.
// This is an example of how virtuals can be used if needed.
peopleSchema.virtual('full_name_virtual').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const People = mongoose.model('People', peopleSchema);

module.exports = People;
