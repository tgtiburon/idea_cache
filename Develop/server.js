// require express for express server functionality
const express = require("express");


const PORT = process.env.PORT || 3001;

//Instantiate the server
const app = express();

// require statement will read the index.js file in each
// of the required locations
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Need these two lines for accepting POST
app.use(express.urlencoded({ extended: true }));
// Parse the incoming JSON data
app.use(express.json());

// Used to allow css and style
// we allow  everything in public folder and sub folders
// we don't need to use endpoints for everything due to this
app.use(express.static("public"));

// USE routes to clean up server.js file.
// if someone navigates to /api the app will use the
// api router we setup in apiRoutes
app.use('/api', apiRoutes);
// if someone uses / as the endpoint we will
// use htmlRoutes
app.use('/', htmlRoutes);


// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



