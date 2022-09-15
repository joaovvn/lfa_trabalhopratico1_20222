const fileEnum = {
  state: "#states",
};

const getAutomatosInformation = (file) => {
  const statesPosition = file.indexOf("#states");
  const initialPosition = file.indexOf("#initial");
  const acceptingPosition = file.indexOf("#accepting");
  const alphabetPosition = file.indexOf("#alphabet");
  const transitionsPosition = file.indexOf("#transitions");

  return {
    states: file.slice(statesPosition + 1, initialPosition),
    initial: file.slice(initialPosition + 1, acceptingPosition),
    accepting: file.slice(acceptingPosition + 1, alphabetPosition),
    alphabet: file.slice(alphabetPosition + 1, transitionsPosition),
    transitions: file.slice(transitionsPosition + 1),
  };
};

module.exports = {
  getAutomatosInformation,
};
