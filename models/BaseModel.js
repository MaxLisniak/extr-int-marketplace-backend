const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig["development"]);

// Give the knex instance to objection.
Model.knex(knex);

module.exports = Model;