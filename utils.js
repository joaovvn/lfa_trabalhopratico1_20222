const isAFND = (automatos) => {
  for (let index = 0; index < automatos.length; index++) {
    const element = automatos[index];
    if (element.goTo.length > 2) {
      return true
    }
  }
}

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
       goTo: h.slice(5).split(",").toString(),
     });
   });
 });

 return {
   states: file.slice(statesPosition + 1, initialPosition),
   initial: file.slice(initialPosition + 1, acceptingPosition),
   accepting: file.slice(acceptingPosition + 1, alphabetPosition),
   alphabet: file.slice(alphabetPosition + 1, transitionsPosition),
   transitions: isAFND(j) === true ? file.slice(transitionsPosition + 1) : j,
   isAFND: isAFND(j)
 };
}

const validateAutomato = (response, automato) => { 
 const finalResponse = {
   acceptingState: automato.accepting,
   currentState: automato.transitions[0].inicial,
 };

 const formatedResponse = response.split("");

 for (let i = 0; i < formatedResponse.length; i++) {
   for (let j = 0; j < automato.transitions.length; j++) {
     if (
        (formatedResponse[i] === automato.transitions[j].letter &&
        finalResponse.currentState.toString().includes(automato.transitions[j].inicial))
     ) {
       finalResponse.currentState = automato.transitions[j].goTo.toString();
       break;
     }
   }
 }

 return finalResponse;
};

const transformNFAtoDFA = (initialState, alphabet, transitions) => {
  const table = {
    states: initialState,
  }
  let transformedTransitions = []
  let aux = 0;
  while (true) {
    let state = table.states[aux].split(',')
    alphabet.forEach(symbol => {
      let nextState;
      transitions.forEach(transition => {
        transition = transition.split(/[:>,]/)
        state.forEach(s => {  
          if(transition[0] == s && transition[1] == symbol) {
            if(transition.length > 3) {
              let states = transition.slice(2)
              if(nextState) {
                nextState = nextState.split(",")
                states.forEach(state => {
                  if(nextState.indexOf(state) == -1) {
                    nextState.push(state)
                  }
                })
                nextState = nextState.join(",")
              } else {
                nextState = states.join(",")
              } 
            } else {
              if(nextState){
                nextState = nextState.split(',')
                if(nextState.indexOf(transition[2]) == -1) {
                  nextState.push(transition[2])
                }
                nextState = nextState.join(",")
              } else {
                nextState = transition[2]
              }
            }
          }
        })
      })
      if(nextState) {
        if(table.states.indexOf(nextState) == -1) {
          table.states.push(nextState)
        }
        transformedTransitions.push({
          inicial: state.join(','),
          letter: symbol,
          goTo: nextState
        })
      }
    })
    aux += 1
    if(aux != table.states.length) {
      continue
    }
    break;
  }
  return transformedTransitions
}

module.exports = {
 isAFND,
 getAutomatosInformation,
 validateAutomato,
 transformNFAtoDFA
};
