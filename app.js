const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const libgenRouter = require('./routes/libgen')
const openLibraryRouter = require('./routes/openlibrary')

const app = express()

const port = process.env.PORT || 3000
const server = app.listen(port, (err) => {
    console.log(`API listening on ${port}!`)
    if (err) throw err
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.use('/libgen', libgenRouter)
app.use('/openlibrary', openLibraryRouter)

module.exports = app