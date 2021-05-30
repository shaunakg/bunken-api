const axios = require('axios');
const express = require('express');
const Request = require('../models/Request')
const router = express.Router();

const API = 'https://library.memoryoftheworld.org'

router.get('/', async(req, res) => {
    const title = req.query.title
    const isbn = req.query.isbn
    let response = await axios.get(`${API}/search/titles/${title}`)
    resp = []
    ebook = {
        title: '',
        author: [],
        link: '',
        cover_img: '',
        downloads: []
    }
    response.data._items.forEach(book => {
        ebook.title = book.title
        ebook.author = book.authors
        ebook.link = null
        ebook.cover_img = `http:${book.library_url}${book.cover_url}`
        book.formats.forEach(format => {
            ebook.downloads.push({
                format: format.format,
                link: `http:${book.library_url}${format.dir_path}${format.file_name}`
            })
        })
        resp.push(ebook)
        ebook = {
            title: '',
            author: [],
            link: '',
            cover_img: '',
            downloads: []
        }
    })
    let request = new Request({
        endpoint: 'motw',
        title: req.query.title,
        isbn: req.query.isbn
    })
    await request.save()
    res.json(resp)
});

module.exports = router