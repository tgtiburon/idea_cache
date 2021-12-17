const path = require("path");
const router = require("express").Router();
//UUID so we can keep track of individual notes
const { v4: uuidv4 } = require("uuid");
//For saving with uuid
const fs = require("fs");
// load the DB into a require
const notesDB = require("../../db/db.json");

//Save new note and add an unique id at the same time.
const uuidSave = (newNote) => {
 
  // load the database first
  const dbPath = path.join(__dirname, "../../db/db.json");
 
  // use uuid to give the new note a unique id
  newNote.id = uuidv4();

  // push the new notes onto the notesDB
  notesDB.push(newNote);

  // save the modified db
  fs.writeFileSync(dbPath, JSON.stringify(notesDB, null, 2));
};
// if user sends /notes send them the json db
router.get("/notes", (req, res) => {

  res.sendFile(path.join(__dirname, "../../db/db.json"));
});

// if user posts to notes, get the body and add it to the db
router.post("/notes", (req, res) => {

  let newNote = req.body;
  uuidSave(newNote);
  res.json(notesDB);
});

// if user deletes a note get it's id and remove it
router.delete("/notes/:id", (req, res) => {
// find the index of note  that has the matching ID
  const dbIndex = notesDB.findIndex(({ id }) => id === req.params.id);
  if (dbIndex >= 0) {
    // removing the note at the index of the clicked note
    notesDB.splice(dbIndex, 1);
  }

  const dbPath = path.join(__dirname, "../../db/db.json");
// save the new database
  fs.writeFileSync(dbPath, JSON.stringify(notesDB, null, 2));

  // send back the updated database;
  res.json(notesDB);
});

module.exports = router;
