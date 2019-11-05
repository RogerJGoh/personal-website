var express = require('express');
var router = express.Router();

var colourData = require('../controllers/colourData.js');

router.get('/', function(req,res,next){
  return colourData.getData(req,res);
});

router.post('/', function(req,res,next){
  return colourData.sendData(req,res);
});

module.exports = router;
