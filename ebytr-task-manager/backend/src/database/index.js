const { Sequelize } = require('sequelize');
const config = require('./config');

const connection = new Sequelize(config);

module.exports = connection;
