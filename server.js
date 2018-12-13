let mongoose = require('mongoose');
let express = require('express');
let exphbs = require('express-handlebars');

let axios = require('axios');
var cheerio = require("cheerio");
let db = require("./models");

let PORT = 3000;

let app = express();


//TO DO: CONFIG MIDDLEWARE//


//ROUTES
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// app.get("/scrape", function (req, res) {
//     console.log("SCRAPE NYTIMES ARTICLES");
//     axios.get("http://www.nytimes.com/").then(function (response) {

//         let $ = cheerio.load(response.data)
//     })
// })





//Start Server
app.listen(PORT, function () {
    console.log(`Port is running on ${PORT}`);
});

