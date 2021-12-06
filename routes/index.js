var express = require('express');
var indexController = require('../controllers/index')

var router = express.Router();

/* GET home page. */
router.get("", indexController.populateSearch);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/*routes logging to console*/
var route, routes = [];
router.stack.forEach(function (middleware) {
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

routes.forEach(function(temp){
	var methods = "";
	for(var method in temp.methods){
		methods += method + ", ";
  }
  if (temp.path == '') {
    path = __filename.substr(__filename.indexOf('\\routes\\') + '\\routes\\'.length).replace('.js', '');
  } else {
    path = temp.path;
  }
	console.log(path + " - " + methods);
});
/*-------------------------*/

module.exports = router;