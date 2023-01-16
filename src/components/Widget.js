import { useState, useEffect } from 'react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import PriceChart from './PriceChart';
import Display from './display/Display';
import DisplayHeader from './display/DisplayHeader';
import DisplayHeaderItem from './display/DisplayHeaderItem';
import TimeSwitch from './timeSwitch/TimeSwitch';
import TimePicker from './timeSwitch/TimePicker';
import TimePickerHeader from './timeSwitch/TimePickerHeader';
import DataColumns from './display/dataColumns/DataColumns';
import DataItem from './display/dataColumns/DataItem';
import ChartContainer from './display/chart/ChartContainer';
import CandleStick from './display/chart/CandleStick';
import Layout from './Layout';
import { findMaxMin, getDate } from '../utils/utils';

import axios from 'axios';
import uniqid from 'uniqid';
axios.defaults.baseURL = 'https://api.binance.com/';

const Widget = () => {
  const intervals = ['15m', '1h', '4h', '1d', '1w'];
  const isMobile = useDeviceDetect();
  const [active, setActive] = useState('15m');
  const [candleIsSelected, setCandleIsSelected] = useState(null);
  const [candleData, setCandleData] = useState(null);
  const [spread, setSpread] = useState(null);

  //axios
  const fetchData = (data) => {
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
        setSpread(findMaxMin(response.data));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setCandleIsSelected(null);
        console.log('loading complited!');
      });
  };

  const onSwitchClickHandler = (data) => {
    fetchData(data);
    setActive(data.interval);
  };

  const onCandleSelectHandler = (element) => {
    setCandleIsSelected(element);
  };

  const data = intervals.map((element, index) => (
    <TimePicker
      key={uniqid()}
      isActive={element === active ? true : false}
      onClick={(event) =>
        onSwitchClickHandler({ interval: element, isMobile: isMobile }, event)
      }>
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  data.unshift(<TimePickerHeader key={uniqid()} />);

  const candleSticks =
    spread !== null
      ? candleData.map((element) => (
          <CandleStick
            key={uniqid()}
            spread={spread}
            open={parseFloat(element[1])}
            high={parseFloat(element[2])}
            low={parseFloat(element[3])}
            close={parseFloat(element[4])}
            isSelected={element === candleIsSelected ? true : false}
            onClick={(event) =>
              onCandleSelectHandler(element, event)
            }></CandleStick>
        ))
      : null;

  useEffect(() => {
    console.log('re-render main!');
    console.log('isMobile: ', isMobile);

    if (candleData === null && isMobile !== null) {
      console.log(isMobile);
      fetchData({ interval: '15m', isMobile: isMobile });
    }
    if (candleData && candleIsSelected === null) {
      setCandleIsSelected(candleData[candleData.length - 1]);
    }
  }, [candleData, candleIsSelected, isMobile]);

  const widget =
    isMobile !== null ? (
      <Layout isMobile={isMobile}>
        <PriceChart isMobile={isMobile}>
          <Display isMobile={isMobile}>
            <DisplayHeader isMobile={isMobile}>
              <DisplayHeaderItem isMobile={isMobile}>
                ETH/USDT Price Chart
              </DisplayHeaderItem>
              <DisplayHeaderItem isMobile={isMobile} altColor>
                {candleIsSelected
                  ? getDate(candleIsSelected[0], isMobile)
                  : null}
              </DisplayHeaderItem>
            </DisplayHeader>
            <ChartContainer isMobile={isMobile}>{candleSticks}</ChartContainer>
            <DataColumns isMobile={isMobile}>
              <DataItem
                isMobile={isMobile}
                header={'Open/Close'}
                firstArg={
                  candleIsSelected
                    ? parseFloat(candleIsSelected[1]).toFixed(2)
                    : null
                }
                secondArg={
                  candleIsSelected
                    ? parseFloat(candleIsSelected[4]).toFixed(2)
                    : null
                }
              />
              <DataItem
                isMobile={isMobile}
                header={'High/Low'}
                firstArg={
                  candleIsSelected
                    ? parseFloat(candleIsSelected[2]).toFixed(2)
                    : null
                }
                secondArg={
                  candleIsSelected
                    ? parseFloat(candleIsSelected[3]).toFixed(2)
                    : null
                }
              />
              <DataItem
                isMobile={isMobile}
                header={isMobile ? 'Chage/Ampl' : 'Change/Amplitude'}
                firstArg={
                  candleIsSelected
                    ? `${(
                        (parseFloat(candleIsSelected[1]) /
                          parseFloat(candleIsSelected[4])) *
                          100 -
                        100
                      ).toFixed(2)}%`
                    : null
                }
                secondArg={
                  candleIsSelected
                    ? `${(
                        (parseFloat(candleIsSelected[2]) /
                          parseFloat(candleIsSelected[3])) *
                          100 -
                        100
                      ).toFixed(2)}%`
                    : null
                }
              />
            </DataColumns>
          </Display>
          <TimeSwitch isMobile={isMobile}>{data}</TimeSwitch>
        </PriceChart>
      </Layout>
    ) : null;

  return widget;
};

export default Widget;
