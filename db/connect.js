// get the fs module
const util = require('util');
const fs = require('fs');
// get the uuid package
const uuidv1 = require('uuid/v1');
// set the promisify for read and writefile
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// set up the connector class for running th function between DB and apiroute
class Connector {
	read () {
	// get Notes function for getting the notes from DB
		return readFileAsync('db/db.json', 'utf8');
	}
	// write notes function for adding new function to the database
	write(note) {
		return writeFileAsync('db/db.json', JSON.strigify(note));
	}

	getNotes() {
		return this.read().then((notes) => {
			let parsedNotes;
	  
			try {
			  parsedNotes = [].concat(JSON.parse(notes));
			} catch (err) {
			  parsedNotes = [];
			}
	  
			return parsedNotes;
		});
	}

	addNote(note) {
		const { title, text } = note;
	
		if (!title || !text) {
		  throw new Error("Note 'title' and 'text' cannot be blank");
		}

		const newNote = { title, text, id: uuidv1() };
	
		return this.getNotes()
		  .then((notes) => [...notes, newNote])
		  .then((updatedNotes) => this.write(updatedNotes))
		  .then(() => newNote);
	  }


	// delete function for removing the notes from DB
	deleteNotes(id) {
		return this.getNotes()
			.then((notes) => notes.filter((note) => note.id !== id))
			.then((filteredNotes) => this.write(filteredNotes));

	}
}

module.exports = new Connector();
