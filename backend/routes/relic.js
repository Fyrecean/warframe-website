var express = require('express');
var database = require('../bin/database');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  let stuff = await database();
  console.log(stuff);
  res.send(stuff);
});

module.exports = router;
