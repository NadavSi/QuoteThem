const fetch = require('node-fetch');
const QuoteSchema = require('../models/quote');
const url = "https://goquotes-api.herokuapp.com/api/v1/";

async function populateSearch() {
    let authors = await module.exports.getAllAuthors();
    let tags = await module.exports.getAllTags();
    return { authors: authors, tags: tags };
}

exports.getRandom = async (req, res, next) => {
    let settings = { method: "Get" };
    fetch(url + 'random?count=1', settings)
        .then(res => res.json())
        .then((json) => {
            console.log(json);
            let quote = new QuoteSchema();
            quote.content = json.quotes[0].text;
            quote.author = json.quotes[0].author;
            populateSearch().then(searchOptions => {
                res.render('quotes/index', { random: true, data: quote, search: searchOptions });
            })
            
        });

}

exports.getAllAuthors = (req, res, next) => {
    let settings = { method: "Get" };
    return fetch(url + 'all/authors', settings)
        .then(quotes => quotes.json())
        .then((json) => {
            return json.authors;
        });
}


exports.getAllTags = (req, res, next) => {
    let settings = { method: "Get" };
    return fetch(url + 'all/tags', settings)
        .then(quotes => quotes.json())
        .then((json) => {
            return json.tags;
        });
}

exports.getByVal = (req, res, next) => {
    params = ""
    console.log(req.query);
    console.log(typeof (req.query), Object.keys(req.query).length);
    if (typeof(req.query) != 'undefined' && Object.keys(req.query).length > 0) {
        params += typeof (req.query.author) == 'undefined' ? '?type=tag&val=' + encodeURI(req.query.tag) : '?type=author&val=' + encodeURI(req.query.author);
    } else if(typeof(req.type) != 'undefined') {
        params += '?type=' + req.type + '&val=' + encodeURI(req.val);
    }

    console.log(params);
    if (params != '') {
        let settings = { method: "Get" };
        console.log(url + 'random/1' + params);
        fetch(url + 'random/1' + params, settings)
            .then(quotes => quotes.json())
            .then((json) => {
                let resArr = [];
                resArr = json.quotes;
                let quote = new QuoteSchema();
                json.quotes.forEach(item => {
                    quote.content = item.text;
                    quote.author = item.author;
                });
                res.render('quotes/index', { random: false, data: quote });
            });
    } else {
        res.render('quotes/index', { random: false, data: quote });
    }
}