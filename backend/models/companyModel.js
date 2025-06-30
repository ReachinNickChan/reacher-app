const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // Core Company Information
  companyName: { type: String, required: true, unique: true },
  companyLink: { type: String }, // From D&B Hoovers
  phone: { type: String },
  companyType: { type: String },
  employeesTotal: { type: String },
  employeesHere: { type: String },
  sales: { type: String },
  district: { type: String },
  industry: { type: String },
  dunsNumber: { type: String },
  companyCountry: { type: String },
  companyCity: { type: String },
  companyState: { type: String },
  companyZipCode: { type: String },
  traded: { type: String },
  website: { type: String },
  linkedinUrl: { type: String },
  twitterUrl: { type: String },
  facebookUrl: { type: String },
  address: { type: String },
  headquarters: { type: String },
  decisionHq: { type: String },
  corporateLinkage: { type: String },
  businessDescription: { type: String },

  // Primary Contact (Note: This will likely be moved to a separate 'Contacts' collection later)
  primaryContactName: { type: String },
  primaryContactTitle: { type: String },
  primaryContactCompany: { type: String },

  // Corporate Family Information (Nested Object)
  corporateFamily: {
    name: { type: String },
    tier: { type: String },
    parent: { type: String },
    companyName: { type: String },
    decisionHq: { type: String },
    headquarter: { type: String },
    subsidiary: { type: String },
    branch: { type: String },
    isDecisionHq: { type: Boolean },
    isHeadquarters: { type: Boolean },
    ownershipType: { type: String },
    entityType: { type: String },
    city: { type: String },
    stateOrProvince: { type: String },
    countryRegion: { type: String },
    employeesSingleSite: { type: String },
    employees: { type: String },
    salesUsd: { type: String },
    dnbHooversIndustry: { type: String },
    keyId: { type: String },
    dunsNumber: { type: String },
    dnbHooversContacts: { type: String },
    directMarketingStatus: { type: String },
  },
}, {
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;