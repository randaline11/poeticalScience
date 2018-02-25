const fs = require('fs');

function writeToFile(nameOfFile, whatToWrite) {
  fs.writeFile(`tmp/${nameOfFile}`, whatToWrite, (err) => {
    if (err) {
      return console.log(err);
    } else {
      console.log('write to file successful');
    }
  });
}

module.exports = { writeToFile };
