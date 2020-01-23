const Sequelize = require('sequelize');
const connection = require('./connection');

const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false // not null
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false // not null
    }
});

Question.sync({force: false}).then(() => {});

module.exports = Question;