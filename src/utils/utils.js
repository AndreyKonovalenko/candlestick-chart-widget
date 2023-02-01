import axios from 'axios';
// axios
export const fetchData = (data, setCandleData, setCandleIndex) => {
  axios
    .get('/api/v3/klines', {
      params: {
        symbol: 'ETHUSDT',
        interval: data.interval,
        limit: data.isMobile ? '21' : '32',
      },
    })
    .then((response) => {
      // handle success
      setCandleData(response.data);
      setCandleIndex(response.data.length - 1);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  // .finally(() => {
  //   ("Binance ETH/USDT klines loaded successfully!");
  // });
};

// parsers
export const getDate = (date, isMobile) => {
  const newDate = new Date(date);
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
    newDate
  );
  const month = new Intl.DateTimeFormat('en-US', {
    month: isMobile ? 'short' : 'long',
  }).format(newDate);
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(newDate);

  return `${day} ${month} ${time}`;
};

export const setDate = (candleIndex, candleData, isMobile) =>
  getDate(candleData[candleIndex][0], isMobile);

export const setOpen = (candleIndex, candleData) =>
  parseFloat(candleData[candleIndex][1]).toFixed(2);

export const setClose = (candleIndex, candleData) =>
  parseFloat(candleData[candleIndex][4]).toFixed(2);

export const setHigh = (candleIndex, candleData) =>
  parseFloat(candleData[candleIndex][2]).toFixed(2);

export const setLow = (candleIndex, candleData) =>
  parseFloat(candleData[candleIndex][3]).toFixed(2);

export const setChange = (candleIndex, candleData) =>
  `${(
    (parseFloat(candleData[candleIndex][1]) /
      parseFloat(candleData[candleIndex][4])) *
      100 -
    100
  ).toFixed(2)}%`;

export const setAmplitude = (candleIndex, candleData) =>
  `${(
    (parseFloat(candleData[candleIndex][2]) /
      parseFloat(candleData[candleIndex][3])) *
      100 -
    100
  ).toFixed(2)}%`;
