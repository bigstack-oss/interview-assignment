const PORT = parseInt(process.env.PORT, 10);

const twentySecondsInterval = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const secondsFlag = seconds > 19 && seconds < 40;
  const minsFlag = minutes % 2 === 0;

  return minsFlag ? secondsFlag : !secondsFlag;
};

const transformOnInterval = data => {
  const json = JSON.parse(data);
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
