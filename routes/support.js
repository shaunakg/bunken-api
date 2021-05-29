const express = require('express');
const router = express.Router();

router.get('/goodreads.js', async(req, res) => {
    res.sendFile(__dirname + '/public/support/goodreads.js')
});

module.exports = router