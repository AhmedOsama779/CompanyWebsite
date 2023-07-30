var express = require('express');
var router = express.Router();
const { getCareers } = require('../controllers/careersController.js');

/* GET home page. */
router.get('/', getCareers);


module.exports = router;
