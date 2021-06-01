const express = require('express');
const router = express.Router();
const audiobookbay = require('audiobookbay')

router.get('/', async(req, res) => {
    const title = req.query.title
    const isbn = req.query.isbn
    const author = req.query.author
    resp = []
    ebook = {
        title: '',
        author: [],
        link: '',
        cover_img: '',
        downloads: []
    }
    let sample = await audiobookbay.search(`${title} ${author}`, 1)
    if (sample.success == false) {
        res.json([])
    } else {
        let pages = sample.paggination.totalPages
        for (let i = 0; i < pages; i++) {
            await audiobookbay.search(`${title} ${author}`, (i + 1)).then(response => {
                response.data.forEach(audiobook => {
                    ebook.title = audiobook.title
                    ebook.author = audiobook.info.size
                    ebook.link = `http://audiobookbay.nl/${audiobook.url}`
                    ebook.cover_img = audiobook.cover
                    ebook.downloads.push({
                        link: ebook.link,
                        format: audiobook.info.format
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
            })
            if (i == (pages - 1)) {
                res.json(resp)
            }
        }
    }
});

module.exports = router