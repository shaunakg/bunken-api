const express = require('express');
const router = express.Router();
const libgen = require('libgen');
const cheerio = require('cheerio');
const Request = require('../models/Request')
const { default: axios } = require('axios');

const MIRROR = 'http://libgen.is'

router.get('/', async(req, res) => {
    const title = req.query.title
    const isbn = req.query.isbn
    resp = []
    async function libgenSearch(query) {
        let data = await libgen.search({
            mirror: MIRROR,
            query: query
        })
        if (Object.keys(data).length != 0) {
            data.forEach(book => {
                resp.push({
                    title: book.title,
                    link: `${MIRROR}/book/index.php?md5=${book.md5}`,
                    author: book.author,
                    cover_img: `${MIRROR}/covers/${book.coverurl}`,
                    downloads: [{
                        format: book.extension,
                        link: `${MIRROR}/get.php?md5=${book.md5}`
                    }]
                })
            })
        }
    }
    if (isbn != 'null') {
        await libgenSearch(isbn)
    }
    if (resp.length == 0) {
        await libgenSearch(title)
    }
    let request = new Request({
        endpoint: 'libgen',
        title: req.query.title,
        isbn: req.query.isbn
    })
    await request.save()
    res.json(resp)
});

router.get('/fiction', async(req, res) => {
    const title = req.query.title
    const isbn = req.query.isbn
    resp = []
    ebook = {
        title: '',
        author: [],
        link: '',
        cover_img: '',
        downloads: []
    }
    let response = await axios.get(`${MIRROR}/fiction?q=${title}`)
    const $ = cheerio.load(response.data)
    $('tbody').find('tr').each((index, row) => {
        download = {
            format: '',
            link: ''
        }
        $(row).find('td').each((index, data) => {
            if (index == 0) {
                ebook.author = [$(data).find('ul > li > a').text()]
            }
            if (index == 2) {
                ebook.title = $(data).find('a').text()
                ebook.link = `${MIRROR}${$(data).find('a').attr('href')}`
                ebook.cover_img = `${MIRROR}/fictioncovers/25000/${$(data).find('a').attr('href').split('/')[2]}.jpg`
                download.link = `http://library.lol/fiction/${$(data).find('a').attr('href').split('/')[2]}`
            }
            if (index == 4) {
                download.format = $(data).text().split('/')[0].trim()
                ebook.downloads.push(download)
                resp.push(ebook)
                ebook = {
                    title: '',
                    author: [],
                    link: '',
                    cover_img: '',
                    downloads: []
                }
            }
        })
    })
    let request = new Request({
        endpoint: 'libgen/fiction',
        title: req.query.title,
        isbn: req.query.isbn
    })
    await request.save()
    res.send(resp)
})

module.exports = router