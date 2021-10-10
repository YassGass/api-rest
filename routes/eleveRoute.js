var express = require('express');
var eleveController = require('../controllers/eleveController')
var router = express.Router();

router.post('/signup', ProfesseurController.signup);
router.post('/login', ProfesseurController.login);


module.exports = router;