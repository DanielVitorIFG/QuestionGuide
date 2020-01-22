const Sequelise = require('sequelize');

const connection = new Sequelise('guiaperguntas','root','Dan7591538462', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;