var express = require('express');
var router = express.Router();
const { getProtfolio } = require('../controllers/protfolioController.js');

/* GET home page. */
router.get('/', getProtfolio );

module.exports = router;
