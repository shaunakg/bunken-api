const express = require('express');
const router = express.Router();
const sources = require('../data/sources')

router.get('/', async(req, res) => {
    res.json(sources())
});

module.exports = router