const fs = require("fs");
const { getAutomatosInformation, validateAutomato, isAFND, transformNFAtoDFA } = require("./utils");

const readFile = () => {
  return fs.readFileSync("./ex02-deterministico.txt").toString().split("\n");
};

(async () => {
  const file = readFile();
  const formatedAutomato = getAutomatosInformation(file);
  console.log("formatedAutomato", formatedAutomato)

  if (formatedAutomato.isAFND) {
    const t = transformNFAtoDFA(formatedAutomato.initial, formatedAutomato.alphabet, formatedAutomato.transitions)
    formatedAutomato.transitions = t
  }

  console.log("[formatedAutomato]", formatedAutomato)

  const response = validateAutomato("baab", formatedAutomato);

  console.log("[RESPONSE]:", response);
})();
