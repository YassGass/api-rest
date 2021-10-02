var express = require('express');
var router = express.Router();
var ProfesseurController = require ('../controllers/professeurController');

router.post('/signup', ProfesseurController.signup);
router.post('/login', ProfesseurController.login);

module.exports = router;