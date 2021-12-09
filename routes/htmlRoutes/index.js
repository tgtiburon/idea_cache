// require path for __dirname
const path = require('path');
//load express's router
const router = require('express').Router();

console.log("in html index dirname = ", __dirname);

// If user sends / send index
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
  });

// If user sends /notes send notes.html
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
    });

// If user sends nothing then send index
router.get("*", (req, res)=> {

    res.sendFile(path.join(__dirname, "../../public/index.html"));
    
})




  module.exports = router;