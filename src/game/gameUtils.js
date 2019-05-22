const activationsForRound = (activations, round) =>
  activations.slice((round - 1) * 4, (round - 1) * 4 + 4);

export { activationsForRound };
