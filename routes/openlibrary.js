const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const title = req.query.title
    const isbn = req.query.isbn
    resp = []
    async function openLibrarySearch(query) {
        let response = await axios.get(`http://openlibrary.org/search.json?q=${query}`)
        response.data.docs.forEach(book => {
            if (book.has_fulltext == true && book.public_scan_b == true) {
                resp.push({
                    title: book.title,
                    link: `https://openlibrary.org${book.key}`,
                    author: book.author_name,
                    cover_img: `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`,
                    downloads: null
                })
            }
        })
    }
    if (isbn != 'null') {
        await openLibrarySearch(isbn)
    }
    if (resp.length == 0) {
        await openLibrarySearch(title)
    }
    let request = new Request({
        endpoint: 'openlibrary',
        title: req.query.title,
        isbn: req.query.isbn
    })
    await request.save()
    res.json(resp)
});

module.exports = router