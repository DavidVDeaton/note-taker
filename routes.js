// Establishing a route to the db.json file required for the note data, making an array to store respones to write to the db
const fs = require("fs");
const path = require("path");
const notesData = require(path.join(__dirname, '../db/db.json'));

// Handling what to do when receiving API requests
module.exports = function(app) {
  // API GET Requests, returning a json file from the db.json file
  app.get("/api/notes", (req, res) => {
    res.json(notesData);
  });

  // API POST Requests
  app.post("/api/notes", (req, res) => {
    // Define where the object containing the note is in the request
      const note = req.body;
      // Assigning the note object a random id from 1-1000 and pushing it to the db.json, which is an array of objects
      // ***Figure out how to ensure no new note receives an existing id # in future versions***, maybe use a for loop to go through the db.json, and if note.id === an existing notesData[i].id, run the randomizer again until it hits a free one, and if there are 1000 notes already, return an indication to the user to delete some notes. Could increase the random number range to make it get stuck doing this minimally, and cap the user at an amount of notes far lower than the randomizer, perhaps by if notesData.length > ~100 it returns an error and prompts to delete notes.

      note.id = Math.ceil(Math.random() * 1000);
      notesData.push(note);
      // return the current note
      res.json(note);

      // Re-writing the db.json file with the newly pushed object
      fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesData), null, 2)

    }
  );
  // Create an app.delete, each note should have a unique url and this function will loop through the information from db.json to find the corresponding note for that url/id, remove it, then rewrite the db.json file
  app.delete("/api/notes/:id", (req, res) => {
    // Defining the part of the request that we will use as the id to identify the array index in the db.json
    let searchID = parseInt(req.params.id);

    // A function that loops through db.json, finds the index that contains an ID matching the request, splices it out, and rewrites the db.json without that index

    function findID() {
      for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id === searchID) {
          notesData.splice(i, 1);

          // Re-writing the db.json file with the newly spliced db.json
           fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesData), null, 2)
            // Sending the newly spliced and written db.json to the client
            res.json(notesData);

            
        }
      }  
    }
    findID();
  });

};