//  requiring fs and util moduals
const fs = require("fs");
const util = require("util");

// creating read file for the fs
const readFromFile = util.promisify(fs.readFile);

// having write file with the arguments of destinationand content
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), err =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};

// creating a function that writes an error if found or to append the right results
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parseData = JSON.parse(data);
      parseData.push(content);
      writeToFile(file, parseData);
    }
  });
};


// exporting the modules
module.exports = { readFromFile, writeToFile, readAndAppend };
