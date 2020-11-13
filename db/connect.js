// get the fs module
const fs = require('fs');
// get the util module
const util = require('util');
// set the promisify for read and writefile
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// set up the connector class for running th function between DB and apiroute
class Connector {
	constructor() {}
	// get Notes function for getting the notes from DB
	getNotes() {
		return readFileAsync('db/db.json', 'utf8').then((notes) => {
			let notesParse = JSON.parse(notes);
			let id = 1;
			notesParse.forEach((note) => {
				note.id = id;
				id++;
			});
			console.log(notesParse);
			return notesParse;
		});
	}
	// write notes function for adding new function to the database
	writeNotes(newNote) {
		return this.getNotes().then((notes) => {
			// check if the object is empty => return error
			if (Object.keys(newNote).length === 0) {
				throw new Error('Please include a title');
			}
			// push the newNote into the notes array
			notes.push(newNote);
			let writeResult = JSON.stringify(notes);
			console.log(writeResult);
			return writeFileAsync('db/db.json', writeResult);
		});
	}
	// delete function for removing the notes from DB
	deleteNotes(id) {
		return this.getNotes().then((notes) => {
			for (let i = 0; i < notes.length; i++) {
				if (parseInt(notes[i].id) === id) {
					notes.splice(i, 1);
					console.log(notes);
				}
			}
			// after removing the data from the array, rewite the new array into DB
			let writeResult = JSON.stringify(notes);
			return writeFileAsync('db/db.json', writeResult);
		});
	}
}

module.exports = new Connector();
