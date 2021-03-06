// requiring the modules that will be imported
const express = require("express");
const router = express.Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET router that will direct the request to the db.json that will be sent to as json
router.get("/", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

// DELETE router that will delete the requested ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  const noteIndex = notes.findIndex(note => note.note_id === id);
  notes.splice(noteIndex, 1);
  writeToFile("./db/db.json", notes);

  return res.send();
});

// POST method that will return the value of the title and text and give a unique ID in db.json file
router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
  } else {
    res.json("Error posting notes!!");
  }
});

// export the Router
module.exports = router;
