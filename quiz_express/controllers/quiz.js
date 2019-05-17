const Sequelize = require("sequelize");
const {models} = require("../models");

// Autoload el quiz asociado a :quizId
exports.load = (req,res,next,quizId) => {
    models.quiz.findByPk(quizId).then(quiz => {
        if(quiz){
            req.quiz = quiz;
            next();
        }else{
            throw new Error ('There is no quiz with id = ' + quizId);
        }
    }).catch(error => next(error));
};

// GET /quizzes
exports.index = (req,res,next) => {
    models.quiz.findAll().then(quizzes => {
        res.render('quizzes/index.ejs', {title: "Lista de Quizzes:", quizzes});
    }).catch(error => next(error));
};