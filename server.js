const express = require("express");
const path = require("path");
const { readFromFile, writeToFile, readAndAppend } = require("./helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params.id)
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  
  const noteIndex = notes.findIndex(note => note.note_id === id);
  console.log(notes)
  notes.splice(noteIndex, 1);
  writeToFile('./db/db.json', notes);

  return res.send();
});

app.post("/api/notes", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
