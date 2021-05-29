# bunken (文献) API
REST API for bunken (文献) - a Chrome extension to download ebooks directly from Goodreads. 

## Run it locally
1. `npm i`
2. `npm run dev`

## Documentation
### Sources
Currently the API has the option to search four sources:
- [Library Genesis](http://libgen.is)
- [Library Genesis Fiction](http://libgen.is/fiction)
- [Memory Of The World](http://library.memoryoftheworld.org)
- [Open Library](http://openlibrary.org)

### Endpoints
The endpoints for each of them are as follows:
- Library Genesis - `/libgen`
- Library Genesis - `/libgen/fiction`
- Memory Of The World - `/motw`
- Open Library - `/openlibrary`

### Parameters
All of the endpoints have the same parameters but different strict rules:
- Library Genesis:
  - `title` - Title of the book to be searched (Required)
  - `isbn` - ISBN Code of the book (Required; 'null' if not available) 
- Library Genesis Fiction:
  - `title` - Title of the book to be searched (Required)
- Memory Of The World:
  - `title` - Title of the book to be searched (Required)
- Open Library:
  - `title` - Title of the book to be searched (Required)
  - `isbn` - ISBN Code of the book (Required; 'null' if not available) 

### Example
A sample request would look something along the lines of:
`https://api.bunken.tk/libgen?title=Meditations&isbn=9780140449334`

### Response Object
The response object would contain an array of ebook objects
A sample response object looks like:
```
[{
    title: "Meditations ",
    link: "http://libgen.is/book/index.php?md5=5a7d04c411aea3cf8d360f0aead1187a",
    author: "Marcus Aurelius, Martin Hammond, Diskin Clay",
    cover_img: "http://libgen.is/covers/391000/5a7d04c411aea3cf8d360f0aead1187a-d.jpg",
    downloads: [{
            format: "pdf",
            link: "http://libgen.is/get.php?md5=5a7d04c411aea3cf8d360f0aead1187a"
        }
    ]
},
{
    title: "Meditations ",
    link: "http://libgen.is/book/index.php?md5=6acd847c7ba985f3e656ac7e8290d7d7",
    author: "Marcus Aurelius (Emperor of Rome), Martin Hammond, Diskin Clay",
    cover_img: "http://libgen.is/covers/749000/6acd847c7ba985f3e656ac7e8290d7d7-d.jpg",
    downloads: [
        {
            format: "pdf",
            link: "http://libgen.is/get.php?md5=6acd847c7ba985f3e656ac7e8290d7d7"
        }
    ]
},
{
    title: "Meditations ",
    link: "http://libgen.is/book/index.php?md5=d92d9c44d9e5df9b9c414a70f46ecfae",
    author: "Marcus Aurelius (Emperor of Rome), Martin Hammond, Diskin Clay",
    cover_img: "http://libgen.is/covers/776000/d92d9c44d9e5df9b9c414a70f46ecfae-d.jpg",
    downloads: [
        {
            format: "pdf",
            link: "http://libgen.is/get.php?md5=d92d9c44d9e5df9b9c414a70f46ecfae"
        }
    ]
}]
```

## How to contribute
Help contribute by using it, finding bugs and opening issues. Pull requests are also appreciated!

Extension repository available at [laxyapahuja/bunken](https://github.com/laxyapahuja/bunken).
