const fs = require("fs");
const { getAutomatosInformation } = require("./utils");

const readFile = () => {
  return fs.readFileSync("./example.txt").toString().split("\n");
};

(async () => {
  const file = readFile();
  const formatedAutomato = getAutomatosInformation(file);
  console.log("file", file);
  console.log("formatedAutomato", formatedAutomato);
})();
