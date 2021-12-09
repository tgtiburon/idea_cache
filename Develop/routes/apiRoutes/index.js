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
  //let allDB = [] ;
  console.log("inside uuidSave");

  // load the database first
  const dbPath = path.join(__dirname, "../../db/db.json");
  // notesDB  = fs.readFileSync(dbPath,'utf8', function(err,dbData) {
  // if(err) {
  //  return console.log(err);
  // }
  //return (dbData);
  //});
  //console.log(notesDB);

  // use uuid to give the new note a unique id
  newNote.id = uuidv4();

  //console.log("Below is notesDB before push");
 // console.table(notesDB);
  // push the new notes onto the notesDB
  notesDB.push(newNote);
  //console.log("Below is notesDB after push");
  //console.table(notesDB);

  // save the modified db
  fs.writeFileSync(dbPath, JSON.stringify(notesDB, null, 2));
};
// if user sends /notes send them the json db
router.get("/notes", (req, res) => {
  //console.log("Inside router.get api/notes");
  res.sendFile(path.join(__dirname, "../../db/db.json"));
});

// if user posts to notes, get the body and add it to the db
router.post("/notes", (req, res) => {
  console.log("post attempted");
  let newNote = req.body;
  uuidSave(newNote);
  res.json(notesDB);
});

// if user deletes a note get it's id and remove it
router.delete("/notes/:id", (req, res) => {
 // console.log("delete attempted");
 // let id = req.params.id;
  
  // loaded array version
  //notesDB = notesDB.filter(({ id }) => id !== req.params.id);

  // modify the array
  console.table(notesDB);
  const dbIndex = notesDB.findIndex(({ id }) => id === req.params.id);
  if (dbIndex >= 0) {
    notesDB.splice(dbIndex, 1);
  }

  console.table(notesDB);

  const dbPath = path.join(__dirname, "../../db/db.json");

  fs.writeFileSync(dbPath, JSON.stringify(notesDB, null, 2));

  // send back the updated database;
  res.json(notesDB);
});

module.exports = router;
