const path = require('path');

//Load ORM
const Sequelize = require('sequelize');

//To use SQLite data base:
const options = {logging: false, operatorsAliases: false};
const sequelize = new Sequelize("sqlite:quizzes.sqlite",options);

//Import the definition of the quiz table from quiz.js
const quiz = sequelize.import(path.join(__dirname,'quiz'));

// Create tables
sequelize.sync().then(() => quiz.count()).then(count => {
    if (count === 0) {
        return quiz.bulkCreate([
            {question: "Capital de Italia", answer: "Roma"},
            {question: "Capital de Francia", answer: "París"},
            {question: "Capital de España", answer: "Madrid"},
            {question: "Capital de Portugal", answer: "Lisboa"}
        ]).then(c => console.log(`DB filled with ${c.length} quizzes.`));
    } else {
        console.log(`DB exists & has ${count} quizzes.`);
    }
}).catch(error => {
    console.log("Error creating the data base tables: ",error);
    process.exit(1);
});

module.exports = sequelize;