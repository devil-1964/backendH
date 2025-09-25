let scores = [];

const storeScores = (newScores) => {
  scores = newScores;
};


const getScores = () => {
  return scores;
};

module.exports = {
  storeScores,
  getScores,
};
