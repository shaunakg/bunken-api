const express = require('express');
const router = express.Router();
const libgen = require('libgen');

router.get('/', async(req, res) => {
    res.send('hello world')
});

module.exports = router