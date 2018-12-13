let cheerio = require('cheerio');

let axios = require('axios');
module.exports = (app) => {
    // app.get('/scrape', (req, res) => {
    //     console.log("INSIDE SCRAPE")
    //     axios.get('http://www.nytimes.com').then((response) => {
    //         console.log("RESPONSE: ", response)

    //         var $ = cheerio.load(response);


    //         $('h1 .eln-headline').each((i, element) => {
    //             console.log("ELEMENT: ", element)
    //         })
    //     })
    // })
    app.get("/scrape", function (req, res) {
        axios.get("http://www.https://www.nytimes.com/").then(function (response) {

            var $ = cheerio.load(response.data);
        })
    })
}