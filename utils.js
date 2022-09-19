const fileEnum = {
  state: "#states",
};

const getAutomatosInformation = (file) => {
  let j = [];
  const statesPosition = file.indexOf("#states");
  const initialPosition = file.indexOf("#initial");
  const acceptingPosition = file.indexOf("#accepting");
  const alphabetPosition = file.indexOf("#alphabet");
  const transitionsPosition = file.indexOf("#transitions");
  const trans = file.slice(transitionsPosition + 1);

  trans.map((u) => {
    let x = u.split();
    x.map((h) => {
      j.push({
        inicial: h.slice(0, 2),
        letter: h.slice(3, 4),
        goTo: h.slice(5).split(","),
      });
    });
  });

  return {
    states: file.slice(statesPosition + 1, initialPosition),
    initial: file.slice(initialPosition + 1, acceptingPosition),
    accepting: file.slice(acceptingPosition + 1, alphabetPosition),
    alphabet: file.slice(alphabetPosition + 1, transitionsPosition),
    transitions: j,
  };
};

const validateAutomato = (response, automato) => {
  const finalResponse = {
    acceptingState: automato.accepting,
    currentState: automato.transitions[0].inicial,
  };

  const formatedResponse = response.split("");

  for (let i = 0; i < formatedResponse.length; i++) {
    for (let j = 0; j < automato.transitions.length; j++) {
      if (
        formatedResponse[i] === automato.transitions[j].letter &&
        finalResponse.currentState === automato.transitions[j].inicial
      ) {
        finalResponse.currentState = automato.transitions[j].goTo.toString();
        break;
      }
    }
  }
  console.log("finalResponse", finalResponse);
  if (finalResponse.acceptingState.includes(finalResponse.currentState)) {
    return true;
  }
  return false;
};

module.exports = {
  getAutomatosInformation,
  validateAutomato,
};
