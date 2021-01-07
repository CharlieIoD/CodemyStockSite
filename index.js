const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// Use Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));



// API Key: pk_5582c7f15d9443259f477f5a01241670
// Create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_5582c7f15d9443259f477f5a01241670', {json: true}, (err, res, body) => {
if (err) {return console.log(err);}
    if (res.statusCode === 200) {
        // console.log(body);
        finishedAPI(body);
    };
});
}

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is Otherstuff";

// Set Handlebar Index GET Route
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
        stock: doneAPI 
        });
    });   
});

// Set Handlebar Index POST Route
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
        // posted_stuff = req.body.stock_ticker;
        res.render('home', {
        stock: doneAPI
        });
    }, req.body.stock_ticker);   
});

// Create About page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));