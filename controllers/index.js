const quotes = require('../controllers/quotes');

exports.populateSearch = async (req, res, next) => {
    let data = await quotes.getAllAuthors();
    res.render('index', { data: data });
}