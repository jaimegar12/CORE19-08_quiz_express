var express = require('express');
var router = express.Router();
const quizController = require('../controllers/quiz');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET credits page. */
router.get('/credits', function(req, res, next) {
  res.render('credits', { title: 'Credits' });
});

// Autoload for routes using: quizId
router.param('quizId', quizController.load);

// Routes for the resource /quizzes
router.get('/quizzes', quizController.index);

module.exports = router;
