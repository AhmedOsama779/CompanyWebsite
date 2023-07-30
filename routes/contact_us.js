var express = require('express');
var router = express.Router();
const { getContact_us } = require('../controllers/contact_usController.js');

/* GET home page. */
router.get('/', getContact_us);

module.exports = router;
