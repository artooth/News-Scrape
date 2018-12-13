let cheerio = require('cheerio');
let axios = require('axios');

module.exports = (app) => {
    // app.get("/scrape", function (req, res) {

    //grab html body with axios//
    axios.get('https://www.nytimes.com').then(function (response) {
        console.log("RESPONSE: ", response)

        var $ = cheerio.load(response.data);


        $('h2 class').each(function (i, element) {
            let result = {};

            //add text and href of links, saving as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    //If error occurs
                    return res.json(err);
                });
        });
    })
}
