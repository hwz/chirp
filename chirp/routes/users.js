var express = require('express');
var router = express.Router();

router.get('/current', function(req, res, next) {
	if(req.user){
		res.send(req.user.username);
	}else{
		res.send("Guest");
	}
});

module.exports = router;
