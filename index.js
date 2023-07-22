const fs = require("fs");
const superagent = require("superagent");

//Call Back Hell
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(`I couldn't find that file`);
  console.log(`Breed : ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(`API PROBLEM 😥`);
      console.log(res.body.message);
      fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
        console.log(`File has been written`);
      });
    });
});
