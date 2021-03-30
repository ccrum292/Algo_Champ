module.exports = airDate => {
  const airDateToMillis = airDate.valueOf();
  const currentDateToMillis = new Date().valueOf();

  const difference = currentDateToMillis - airDateToMillis

  return {
    minutes: Math.floor(difference / 60000),
    remainderSeconds: ((difference % 60000) / 1000).toFixed(0),
    totalSeconds: (difference / 1000),
    totalMinutes: (difference / 60000)
  }

};