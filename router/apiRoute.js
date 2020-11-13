// get the router module
const router = require('express').Router();
// get the Connector.js
const Connector = require('../db/connect');

// route to the function for getting the data from the database
router.get('/notes', (req, res) => {
	// route to the function
	Connector.getNotes().then((notes) => res.json(notes));
});

// route to the function for posting the data to the database
router.post('/notes', (req, res) => {
	// capture the new data from html input
	let newNotes = req.body;
	// route to the function
	Connector.writeNotes(newNotes)
		// regenerate the note list to html
		.then(() => Connector.getNotes().then((notes) => res.json(notes)))
		.catch((err) => res.json(err.message));
});

// route to the function for deleting the data from the database
router.delete('/notes/:id', (req, res) => {
	// capture the id tha the user would need to remove
	let deleteNoteID = parseInt(req.params.id);
	// route to the delete function
	Connector.deleteNotes(deleteNoteID).then(() =>
		// regenerate the note list to html
		Connector.getNotes().then((notes) => res.json(notes))
	);
});

module.exports = router;
