const fileEnum = {
  state: "#states",
};

const getAutomatosInformation = (file) => {
  let j = []
  const statesPosition = file.indexOf("#states");
  const initialPosition = file.indexOf("#initial");
  const acceptingPosition = file.indexOf("#accepting");
  const alphabetPosition = file.indexOf("#alphabet");
  const transitionsPosition = file.indexOf("#transitions");
  const trans =  file.slice(transitionsPosition + 1)
  
  let y = trans.map((u) => { 
    let x = u.split()
    x.map((h) => {
      j.push({
        inicial: h.slice(0,2),
        letter: h.slice(3,4),
        goTo: h.slice(5).split(","),
      })
    })
  })
  
  return {
    states: file.slice(statesPosition + 1, initialPosition),
    initial: file.slice(initialPosition + 1, acceptingPosition),
    accepting: file.slice(acceptingPosition + 1, alphabetPosition),
    alphabet: file.slice(alphabetPosition + 1, transitionsPosition),
    transitions: j
  };
};

const validateAutomato = (automato) => {
  const result = [{
    finalState,
    acceptingState: automato.accepting,
  }];
}

module.exports = {
  getAutomatosInformation,
};
