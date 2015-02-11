var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
// 	console.log("DEBUG!!");
  
//   return res.send(401, {message:'not authenticated'});
// });

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log("request is " + req.user.username);
	res.render('index', { current_user: "req.user.username" });
});

module.exports = router;
