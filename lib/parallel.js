//Promise.all wrapper to handle rejects
const toResult = (promise) => {
  return promise
      .then(result => ({ success: true,  body: result }))
      .catch(error => ({ success: false, body: error }));
};

const runAll = promList => Promise.all(promList.map(toResult));

module.exports = {
  toResult,
  runAll
};
  