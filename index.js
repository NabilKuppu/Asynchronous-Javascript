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
      if (err) reject("Couldn't write the file");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    console.log(`File has been written`);
  } catch (err) {
    console.log(err);
    throw err;
  }
  return `2: Ready 🔥`;
};

// IFEE
(async () => {
  try {
    console.log(`1 : Will I get the Dog Pic`);
    const x = await getDogPic();
    console.log(x);
    console.log(`3: Get the Dog Pic`);
  } catch (err) {
    console.log(err);
  }
})();

// Return Promise and Consume the new Promise
/* 
console.log(`1 : Will I get the Dog Pic`);
getDogPic()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log(err);
    console.log(`3: Get the Dog Pic`);
  });
  */

//   then Method
/*
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
  */
//Call Back Hell
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(`I couldn't find that file`);

});
*/
