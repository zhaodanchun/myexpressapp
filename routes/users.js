var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.setHeader('status', '200 OK');
    res.setHeader('Set-Cookie', ['servercookie1=1111;path=/;expires=' + new Date('2017/05/17 12:00').toGMTString(),'servercookie2=2222;path=/;expires=' + new Date('2017/05/20 12:00').toGMTString(),'servercookie3=3333;path=/;expires=' + new Date('2017/06/20 11:03').toGMTString()]);
	
	  
    res.json({
		ret:0,
		content:"success"
	});

});

module.exports = router;
