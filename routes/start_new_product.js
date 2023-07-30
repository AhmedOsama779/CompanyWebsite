var express = require('express');
var router = express.Router();
const { getStart_new_product } = require('../controllers/start-new-productContoller');

/* GET home page. */
router.get('/', getStart_new_product);

module.exports = router;
