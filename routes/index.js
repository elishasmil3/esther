var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
	return res.render('index.ejs', {
		req: req,
	});
});

module.exports = router;