const express = require('express');
const router = express.Router();
const libgen = require('libgen');

router.get('/', async(req, res) => {
    const data = await libgen.search({
        mirror: 'http://libgen.rs',
        query: req.query.q
    })
    resp = []
    if (Object.keys(data).length != 0) {
        data.forEach(book => {
            resp.push({
                title: book.title,
                download: `http://libgen.rs/get.php?md5=${book.md5}`,
                author: book.author,
                cover_img: `http://libgen.rs/covers/${book.coverurl}`
            })
        })
    }
    res.json(resp)
});

module.exports = router