const express = require('express');
const router = express.Router();

router.get('/goodreads.js', async(req, res) => {
    let request = new Request({
        endpoint: 'goodreads.js'
    })
    await request.save()
    res.sendFile(__dirname + '/public/support/goodreads.js')
});

module.exports = router