export const findMaxMin = (arr) => {
  const highest = arr.reduce((prev, cur) => {
    return parseFloat(cur[2]) > parseFloat(prev[2]) ? cur : prev;
  });
  const lowest = arr.reduce((prev, cur) =>
    parseFloat(cur[3]) < parseFloat(prev[3]) ? cur : prev
  );
  const max = parseFloat(highest[2]);
  const min = parseFloat(lowest[3]);
  const spread = max - min;
  return {
    max: max,
    min: min,
    spread: spread,
  };
};

export const getDate = (date) => {
  const newDate = new Date(date);
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    newDate
  );
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    newDate
  );
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(newDate);

  return `${day} ${month} ${time}`;
};
