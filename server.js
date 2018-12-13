let mongoose = require('mongoose');
let express = require('express');
let exphbs = require('express-handlebars');

let axios = require('axios');
var cheerio = require("cheerio");
let db = require("./models");

let PORT = 3000;

let app = express();


//TO DO: CONFIG MIDDLEWARE//

require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

//ROUTES



//Start Server
app.listen(PORT, function () {
    console.log(`Port is running on ${PORT}`)
}); 

