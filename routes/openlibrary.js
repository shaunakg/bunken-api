const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    let response = await axios.get(`http://openlibrary.org/search.json?q=${req.query.q}`)
    resp = []
    response.data.docs.forEach(book => {
        if (book.has_fulltext == true && book.public_scan_b == true) {
            resp.push({
                title: book.title,
                link: `https://openlibrary.org${book.key}`,
                author: book.author_name,
                cover_img: `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
            })
        }
    })
    res.json(resp)
});

module.exports = router