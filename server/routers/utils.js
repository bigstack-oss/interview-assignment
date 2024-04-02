const PORT = parseInt(process.env.PORT, 10);

/**
 * a utility function that will return an alternating true/false value every 20 seconds
 * @returns {boolean} true or false depending on the current server clock time
 */
const twentySecondsInterval = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const secondsFlag = seconds > 19 && seconds < 40;
  const minsFlag = minutes % 2 === 0;

  return minsFlag ? secondsFlag : !secondsFlag;
};

/**
 * utility function to transform instance Data on a fixed time interval,
 * only switching one property (instance status) of a single instance
 * @param {object} data - object containing data for multiple instances
 * @returns {object} - transformed data
 */
const transformOnInterval = data => {
  let json = [];
  try {
    json = JSON.parse(data);
  } catch (e) {
    console.log('error to parse json data', e);
  }
  const shouldTransform = twentySecondsInterval();
  if (!shouldTransform) return json;
  return json.map(i => {
    if (i.id === 'abda0391-4660-48ab-a203-125a063f228c') {
      i.status = 'active';
    }
    return i;
  });
};

module.exports = { PORT, transformOnInterval };
