const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
const fs = require('fs');

const app = express()  // make express app
//const port = 8081

// ADD THESE COMMENTS AND IMPLEMENTATION HERE
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view
// 2 include public assets and use bodyParser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 set up the logger
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));
// 4 handle valid GET requests
app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname + '/assets/index.html'))
    res.render("index.ejs")
})

app.get("/fibo", function (req, res) {
    res.render("fibo.ejs")
})

app.get("/index", function (req, res) {
    res.render("index.ejs")
})

app.get("/contact", function (req, res) {
    res.render("contact.ejs")
})

// 5 handle valid POST request
app.get("/", function (req, res) {

    var api_key = '1066b065597e1984085e935c93119dd8-4836d8f5-74e0b1fe';
    var domain = 'sandbox29fb830f4ed84298abfe78c42725fe1d.mailgun.org';
    var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

    var data = {
        from: 'Excited User <postmaster@sandbox29fb830f4ed84298abfe78c42725fe1d.mailgun.org>',
        to: 'hyndavi.musipatla1996@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });

})
// 6 respond with 404 if a bad URI is requested
app.get(function (req, res) {
    res.render("404")
})

// Listen for an application request on port 8081
app.listen(process.env.PORT||8081, function () {
    console.log('Web app started and listening on http://localhost:8081/')
})


