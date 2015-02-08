var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
// 	console.log("DEBUG!!");
  
//   return res.send(401, {message:'not authenticated'});
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chirp!' });
});

module.exports = router;
