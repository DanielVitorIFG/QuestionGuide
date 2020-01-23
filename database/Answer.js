const Sequelize = require('sequelize');
const connection = require('./connection');

const Answer = connection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force:false});

module.exports = Answer;