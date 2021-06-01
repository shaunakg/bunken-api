const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config();

const indexRouter = require('./routes/index')
const sourcesRouter = require('./routes/sources')
const libgenRouter = require('./routes/libgen')
const openLibraryRouter = require('./routes/openlibrary')
const motwRouter = require('./routes/motw')
const audioBookBayRouter = require('./routes/audiobookbay')

const db = process.env.DB_URL

const app = express()

const port = process.env.PORT || 3000

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());

app.use('/', indexRouter)
app.use('/sources', sourcesRouter)
app.use('/libgen', libgenRouter)
app.use('/openlibrary', openLibraryRouter)
app.use('/motw', motwRouter)
app.use('/audiobookbay', audioBookBayRouter)

app.listen(port, (err) => {
    console.log(`API listening on ${port}!`)
    if (err) throw err
})

module.exports = app