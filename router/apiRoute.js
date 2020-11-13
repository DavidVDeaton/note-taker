// get the router module
const router = require('express').Router();
// get the Connector.js
const Connector = require('../db/Connect');

// route to the function for getting the data from the database
router.get('/notes', (req, res) => {
	// route to the function
	Connector.getNotes().then((notes) => res.json(notes));
});

// route to the function for posting the data to the database
router.post('/notes', (req, res) => {

	Connector.addNote(req.body)
		// regenerate the note list to html
		.then((note) => res.json(note))
		.catch((err) => res.json(err.message));
});

// route to the function for deleting the data from the database
router.delete('/notes/:id', (req, res) => {

	Connector.deleteNotes(req.params.id).then(() => res.json({ok: true}))
	
});

module.exports = router;
