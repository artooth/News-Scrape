let mongoose = require('mongoose');
let express = require('express');
var logger = require("morgan");
let exphbs = require('express-handlebars');
let axios = require('axios');
var cheerio = require("cheerio");
let db = require("./models");

let PORT = process.env.PORT || 3000;

let app = express();


// config mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//CONFIG MIDDLEWARE//
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// CONNECT TO THE MONGO DB//



mongoose.connect("mongodb://heroku_v706sstx:dingp8rpj67i20drlpf7u1ddhn@ds227243.mlab.com:27243/heroku_v706sstx", { useNewUrlParser: true });

// //ROUTES
// require('./routes/htmlRoutes')(app);
// require('./routes/apiRoutes')(app);



//Get route for scraping the nytimes
app.get("/scrape", function (req, res) {

    //grab html body with axios//
    axios.get("https://www.nytimes.com/section/technology").then(function (response) {
        console.log("RESPONSE: ", response)
        //load into cheerio
        var $ = cheerio.load(response.data);


        $("article").each(function (i, element) {
            let result = {};

            //add text and href of links, saving as properties of the result object
            result.title = $(this)
                .children("h2")
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
});


//Route for getting all articles from db
app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


//Route for grabbing a specific article by id and pupulating it with its note
app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })

        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route for saving/updating an Articles asscioated Note
app.post("/articles/:id", function (req, res) {

    db.Note.create(req.body)
        .then(function (dbNote) {

            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


//Start Server
app.listen(PORT, function () {
    console.log("App running on PORT:" + PORT);
})