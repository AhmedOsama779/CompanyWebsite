var express = require('express');
var router = express.Router();
const { getAbout } = require('../controllers/about_usController.js');

/* GET home page. */
router.get('/', getAbout);

module.exports = router;
