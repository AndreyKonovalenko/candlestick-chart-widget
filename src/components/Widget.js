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
import Layout from './Layout';
import {
  findMaxMin,
  setDate,
  setOpen,
  setClose,
  setHigh,
  setLow,
  setChange,
  setAmplitude,
} from '../utils/utils';
import {
  drawChart,
  setSelectedColor,
  setDefaultColor,
  pointInPath,
} from '../utils/chart';

import axios from 'axios';
import uniqid from 'uniqid';
import theme from '../theme/theme';

axios.defaults.baseURL = 'https://api.binance.com/';
const Widget = () => {
  const canvasId = 'candlestick-chart';
  const { colors } = theme;
  const isMobile = useDeviceDetect();
  const intervals = ['15m', '1h', '4h', '1d', '1w'];
  const [candleData, setCandleData] = useState(null);
  const [spread, setSpread] = useState(null);
  const [candleList2D, setCandleList2D] = useState(null);
  const [activePicker, setActivePicker] = useState('15m');
  const [candleIndex, setCandleIndex] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(false);

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
        setCandleIndex(response.data.length - 1);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('Binance ETHUSDT klines loaded successfully!');
      });
  };

  const resetState = () => {
    setCandleData(null);
    setCandleList2D(null);
    setCandleIndex(null);
  };

  const onSwitchClickHandler = (data) => {
    setActivePicker(data.interval);
    resetState();
    fetchData(data);
  };

  const onCandleSelectHandler = (candleList2D, event) => {
    const context = document.getElementById(canvasId).getContext('2d');
    if (candleList2D !== null) {
      for (const element of candleList2D) {
        if (pointInPath(element, context, event)) {
          setCandleIndex(candleList2D.indexOf(element));
          return;
        }
      }
    }
  };

  const onCanvasHoverHandler = (candleList2D, event) => {
    const context = document.getElementById(canvasId).getContext('2d');
    if (candleList2D !== null) {
      for (const element of candleList2D) {
        if (pointInPath(element, context, event)) {
          setCursorStyle(true);
          if (candleList2D.indexOf(element) !== candleIndex) {
            setSelectedColor(element, context, colors);
          }
          return;
        } else {
          if (candleList2D.indexOf(element) !== candleIndex) {
            setDefaultColor(element, context, colors);
          }
          setCursorStyle(false);
        }
      }
    }
  };

  const switchBar = intervals.map((element, index) => (
    <TimePicker
      key={uniqid()}
      isActive={element === activePicker ? true : false}
      onClick={(event) =>
        onSwitchClickHandler({ interval: element, isMobile: isMobile }, event)
      }>
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  switchBar.unshift(<TimePickerHeader key={uniqid()} />);

  useEffect(() => {
    if (candleData === null && isMobile !== null) {
      fetchData({ interval: activePicker, isMobile: isMobile });
    }
    if (
      candleData !== null &&
      spread !== null &&
      candleIndex !== null &&
      candleList2D === null
    ) {
      setCandleList2D(
        drawChart(spread, candleData, canvasId, colors, candleIndex)
      );
    }
  }, [
    activePicker,
    candleData,
    candleIndex,
    candleList2D,
    colors,
    cursorStyle,
    isMobile,
    spread,
  ]);

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
                {setDate(candleIndex, candleData, isMobile)}
              </DisplayHeaderItem>
            </DisplayHeader>
            <ChartContainer
              cursorStyle={cursorStyle}
              isMobile={isMobile}
              id={canvasId}
              onMouseMoveCapture={(event) =>
                onCanvasHoverHandler(candleList2D, event)
              }
              onClick={(event) => onCandleSelectHandler(candleList2D, event)}
            />
            <DataColumns isMobile={isMobile}>
              <DataItem
                isMobile={isMobile}
                header={'Open/Close'}
                firstArg={setOpen(candleIndex, candleData)}
                secondArg={setClose(candleIndex, candleData)}
              />
              <DataItem
                isMobile={isMobile}
                header={'High/Low'}
                firstArg={setHigh(candleIndex, candleData)}
                secondArg={setLow(candleIndex, candleData)}
              />
              <DataItem
                isMobile={isMobile}
                header={isMobile ? 'Chage/Ampl' : 'Change/Amplitude'}
                firstArg={setChange(candleIndex, candleData)}
                secondArg={setAmplitude(candleIndex, candleData)}
              />
            </DataColumns>
          </Display>
          <TimeSwitch isMobile={isMobile}>{switchBar}</TimeSwitch>
        </PriceChart>
      </Layout>
    ) : null;

  return widget;
};

export default Widget;
