var express = require("express");

var router = express.Router();

var path = require("path")

// Import the model (note.js) to use its database functions.
var note = require("../models/note.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})
router.get("/data", function(req, res) {
    note.all(function(data) {
      res.json({ notes: data });
    });
});
router.post("/api/notes", function(req, res) {
    note.create([
        "title", "body"
    ], [
        req.body.title, req.body.body
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
router.delete("/api/notes/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    note.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});

module.exports = router;
