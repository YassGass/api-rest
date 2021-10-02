var express = require('express');
var eleveController = require('../controllers/eleveController')
var router = express.Router();

router.get('/', eleveController.list);

router.get('/:id', eleveController.show);

router.post('/', eleveController.create);

router.put('/:id', eleveController.update);

router.delete('/:id', eleveController.remove);


module.exports = router;