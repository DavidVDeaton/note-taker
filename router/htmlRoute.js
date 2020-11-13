// get the path module
const path = require('path');
// get the router module
var router = require('express').Router();

// "/notes" responds with the notes.html file
router.get('/notes', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public/notes.html'), function (err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
});

// All other routes respond with the index.html file
router.get('*', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public/index.html'), function (err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});
});

module.exports = router;
