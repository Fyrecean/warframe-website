var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log("hi");
  res.sendFile(path.relative("../public/index.html"));
});

module.exports = router;
