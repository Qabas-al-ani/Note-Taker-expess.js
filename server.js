const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const PORT = process.env.port || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
const readFromFile = util.promisify(fs.readFile);

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
    };
    readAndAppend(newNote, "./db/db.json");
  } else {
    res.json("Error posting notes!!");
  }
});

app.listen(PORT, () => {
  console.log(`app listening at https://localhost${PORT}`);
});
