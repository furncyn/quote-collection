const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const url = "mongodb+srv://furncyn:courtside5@watchlist-4bthd.gcp.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Connect to database and create collection
MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    var db = client.db("customers_watchlist");
    
    app.listen(port, function() {
        console.log(`listening on port ${port}`);
    })

    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray((err, result) => {
            if (err) return console.log(err)
            // renders index.ejs
            res.render('index.ejs', {quotes: result})
          })
    })

    app.post('/quotes', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/')
        })
    })
});
