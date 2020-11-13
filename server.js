// get the express module
const express = require('express');
const apiRoutes = require('./router/apiRoute');
const htmlRoutes = require('./router/htmlRoute');

const app = express();

// set the port as either assign by heroku or 8080 in local
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// add the port listener
app.listen(PORT, function () {
	console.log(`App listening on PORT:${PORT}`);
});
