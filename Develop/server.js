// require express for express server functionality
const express = require("express");

// require path
const path = require("path");

//UUID so we can keep track of individual notes
const { v4: uuidv4 } = require('uuid');

//For saving with uuid
const fs = require('fs');

const PORT = process.env.PORT || 3001;

// load the DB into a require
const notesDB = require('./db/db.json');
const { traceDeprecation } = require("process");

//Instantiate the server
const app = express();



// require statement will read the index.js file in each
// of the required locations
//const apiRoutes = require('./routes/apiRoutes');
//const htmlRoutes = require('./routes/htmlRoutes');

// Need these two lines for accepting POST
app.use(express.urlencoded({ extended: true }));
// Parse the incoming JSON data
app.use(express.json());

// Used to allow css and style
// we allow  everything in public folder and sub folders
// we don't need to use endpoints for everything due to this
app.use(express.static("public"));

// if someone navigates to /api the app will use the
// api router we setup in apiRoutes

//app.use('/api', apiRoutes);
// if someone uses / as the endpoint we will
// use htmlRoutes
//app.use('/', htmlRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})


//Save with UUID id
const uuidSave = (newNote) => {
   //newNote = data;
  //let allDB = [] ;
  console.log("inside uuidSave");
 // console.log(newNote)
  // load the database first
  const dbPath = path.join(__dirname, "/db/db.json");
 // notesDB  = fs.readFileSync(dbPath,'utf8', function(err,dbData) {
   // if(err) {
    //  return console.log(err);
   // }
    //return (dbData);

   //});

   //console.log(notesDB);

  newNote.id  = uuidv4();

  console.log("Below is notesDB")
  console.table(notesDB);


  //console.log(newNote); 
  notesDB.push(newNote);
  console.log("Below is notesDB after push")
  console.table(notesDB);
  
  // save the modified db
  fs.writeFileSync(dbPath, 
      JSON.stringify(notesDB, null, 2) 
   ); 
};

app.post('/api/notes', (req,res)=> {
  console.log("post attempted");
  //console.log(req.body);
  let newNote = req.body;
  uuidSave(newNote);
  res.json(notesDB);
 
});
/*
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  */

app.delete('/api/notes/:id', (req, res) => {
  console.log("delete attempted");
  let id = req.params.id;
  //id = JSON.stringify(id);
 // console.log(id);
 // console.log(req.body);
 //console.table(notesDB);
 //let tmpDB =JSON.stringify(notesDB)
 notesDB.forEach(element => {
   //tmpStr = JSON.stringify(element.id);
   // console.log('id', id);
   //console.log('elementid', element.id);

    if(element.id === id) {
      //console.log("id", id);
      //console.log("element", element);
      console.log('match')
    }
 });
 /*  
    app.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    myArray = myArray.filter(({ id }) => id !== req.params.id);
  });

 */
 // loaded array version
 //notesDB = notesDB.filter(({ id }) => id !== req.params.id);
 
 // modify the array
console.table(notesDB);
const dbIndex = notesDB.findIndex(({ id })=> id === req.params.id);
  if(dbIndex >= 0) {
    notesDB.splice(dbIndex, 1);


  }



 console.table(notesDB);

 const dbPath = path.join(__dirname, "/db/db.json");

 fs.writeFileSync(dbPath, 
  JSON.stringify(notesDB, null, 2) 
); 

  // send back the updated database;
  res.json(notesDB);
  
});



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});



