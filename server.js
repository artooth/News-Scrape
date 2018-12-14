let mongoose = require('mongoose');
let express = require('express');
let exphbs = require('express-handlebars');

let axios = require('axios');
var cheerio = require("cheerio");
let db = require("./models");

let PORT = 3000;

let app = express();


//TO DO: CONFIG MIDDLEWARE//

//TO DO: CONNECT TO THE MONGO DB//
mongoose.connect("mongodb://heroku_v706sstx:dingp8rpj67i20drlpf7u1ddhn@ds227243.mlab.com:27243/heroku_v706sstx", { useNewUrlParser: true });

// //ROUTES
// require('./routes/htmlRoutes')(app);
// require('./routes/apiRoutes')(app);


// app.get("/scrape", function (req, res) {

//grab html body with axios//
axios.get('http://www.echojs.com/').then(function (response) {
    console.log("RESPONSE: ", response)

    var $ = cheerio.load(response.data);


    $("article h2").each(function (i, element) {
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

    res.send("scrape complete");
});
// });


//Route for getting all articles from db
app.get("/articles", function (req, res) {

    db.Articles.find({})
        .then(function (dbArticles) {
            res.json(dbArticles);
        })
        .catch(function (err) {
            res.json(err);
        });

});



app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })

        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .cath(function (err) {
            res.json(err);
        });
});





//Start Server
app.listen(PORT, function () {
    console.log(`Port is running on ${PORT}`);
});

