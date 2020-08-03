var express = require('express');
var database = require('../bin/database');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.json((await database.getDropsFromRelic("Axi L1")));
});

module.exports = router;
