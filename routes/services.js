var express = require('express');
var router = express.Router();
const { getServices } = require('../controllers/servicesController');

/* GET home page. */
router.get('/', getServices );

module.exports = router;
