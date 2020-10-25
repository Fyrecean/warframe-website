var express = require('express');
var database = require('../bin/database');
var router = express.Router();

/* GET users listing. */
router.get('/:relicType/:relicName', async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.json((await database.getDropsFromRelic(req.params.relicType, req.params.relicName)));
});

module.exports = router;
