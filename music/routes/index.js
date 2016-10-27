var express = require('express');
var router = express.Router();
var path = require("path");
var media = path.join(__dirname,"../public/media/");

/* GET home page. */
router.get('/', function(req, res, next) {
	var fs = require("fs");
	fs.readdir(media,function(err,musicList){
		if (err) {
			console.log(err);
		}else{
			res.render('index', { title: 'web music',musicList:musicList });
		}
	});
  
});

module.exports = router;


