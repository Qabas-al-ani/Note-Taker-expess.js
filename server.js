// requiring the needed modules
const express = require("express");
const path = require("path");
const noteRouter = require("./routes/noteRouter");

// specifying port to work with the right environment or the directed local host
const PORT = process.env.PORT || 3001;

// initiating the app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the public folder to render the info
app.use(express.static("public"));

// using the noteRouter file in the api/notes to get the data
app.use("/api/notes", noteRouter);

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// app is listening to the port
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
