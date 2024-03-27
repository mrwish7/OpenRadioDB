const express = require('express');
const router = express.Router();
const txRecords = require('../services/txRecords');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    console.log(req.body);
    res.json(await txRecords.getMultiple(req.body, req.query.page));
  } catch (err) {
    console.error(`Error while getting TX records `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await txRecords.postMultiple(req.body));
  } catch (err) {
    console.error(`Error while getting TX records `, err.message);
    next(err);
  }
});

module.exports = router;