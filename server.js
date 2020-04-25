// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path");
var dbJSON = require("./db/db.json");
var app = express();
var PORT = 8080;
app.use(express.static("public"));
var bodyParser = require('body-parser');
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get(`/notes`, function(req, res) {
  res.sendFile(path.join(__dirname, "public","notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.json(dbJSON);
});

app.delete("/api/notes/:id", function(req, res) {
  console.log("this is the id",req.params.id);
  let keepNotes = [];
  dbJSON.forEach(function(singleNote){
    // console.log(singleNote);
    if(singleNote.id != req.params.id){
      keepNotes.push(singleNote);
  }

});
dbJSON = keepNotes;
res.json;
});

app.get(`*`, function(req, res) {
  res.sendFile(path.join(__dirname, "public","index.html"));
});

app.post("/api/notes", function(req, res) {
  // console.log(req.body)
  var newNote = req.body;
  newNote.id = dbJSON.length +1;
  dbJSON.push(newNote);
  res.json(dbJSON);
})

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
