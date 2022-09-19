const fs = require("fs");
const { getAutomatosInformation, validateAutomato } = require("./utils");

const readFile = () => {
  return fs.readFileSync("./abb-baa.txt").toString().split("\n");
};

(async () => {
  const file = readFile();
  const formatedAutomato = getAutomatosInformation(file);
  // 1001001
  // 0011
  // 0000000
  const response = validateAutomato("aaabb", formatedAutomato);
  console.log("[RESPONSE]:", response);
})();
