const quotes = require('../controllers/quotes');

exports.populateSearch = async (req, res, next) => {
    let authors = await quotes.getAllAuthors();
    let tags = await quotes.getAllTags();
    res.render('index', { authors: authors, tags: tags });
}
