var express = require('express');
var indexController = require('../controllers/index')
var session = require('express-session');
var app = express();
app.use(session({ secret: 'XOXOXOP', resave: false, saveUninitialized: true }));
const quotes = require('../controllers/quotes');

var router = express.Router();

router.get('/', async (req, res) => {
  let authors = await quotes.getAllAuthors();
  let tags = await quotes.getAllTags();
  var ssn = req.session;
  ssn.authors = authors;
  ssn.tags = tags;

  res.redirect('quotes');
})

module.exports = router;
