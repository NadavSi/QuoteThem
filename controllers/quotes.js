const fetch = require('node-fetch');
const QuoteSchema = require('../models/quote');
const url = "https://goquotes-api.herokuapp.com/api/v1/";

exports.getAll = (req, res, next) => {
    var lang = 'en';
    let settings = { method: "Get" };
    fetch(url + 'random?count=1', settings)
    .then(res => res.json())
        .then((json) => {
            console.log(json);
            let quote = new QuoteSchema();
            quote.content = json.quotes[0].text;
            quote.author = json.quotes[0].author;
            res.render('quotes/index', { data: quote });
    });
    
}  

exports.getAllAuthors = (req,res,next) => {
    var lang = 'en';
    let settings = { method: "Get" };
    fetch(url + 'all/authors', settings)
    .then(res => res.json())
        .then((json) => {
            console.log(json);
            res.send({ data: json.authors });
    });
}