const fs = require("fs");
const { resolve } = require("path");
const superagent = require("superagent");

//Create Promise

//Read File
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`I couldn't find that file`);
      resolve(data);
    });
  });
};
// Write File
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      console.log(`File has been written`);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log(`File has been written`);
  })
  .catch((err) => {
    console.log(err);
  });
//Call Back Hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   if (err) return console.log(`I couldn't find that file`);

// });
