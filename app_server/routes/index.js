var express = require('express');
var router = express.Router();

var surveyData = require('../controllers/surveyData.js');

router.get('/', function(req,res,next){
  return surveyData.getData(req,res);
});

module.exports = router;
