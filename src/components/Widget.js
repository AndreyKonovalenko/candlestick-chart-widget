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
  getDate,
  setSelectedColor,
  setDefaultColor,
} from '../utils/utils';
import { drawChart } from '../utils/drawChart';

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
  const [candleList2D, setCandleList2D] = useState(null);
  // const [candle2D, setCandle2D] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(false);
  const [activePicker, setActivePicker] = useState('15m');
  const [candleIndex, setCandleIndex] = useState(null);

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
        setCandleIndex(response.data.length - 1);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('loading complited!');
      });
  };

  const onSwitchClickHandler = (data) => {
    resetState();
    fetchData(data);
    setActivePicker(data.interval);
  };

  const resetState = () => {
    setCandleData(null);
    setCandleList2D(null);
    setCandleIndex(null);
  };

  const onCandleSelectHandler = (candleList2D, event) => {
    const context = document.getElementById(canvasId).getContext('2d');
    if (candleList2D !== null) {
      for (const element of candleList2D) {
        if (
          context.isPointInPath(
            element.candle.rect,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          ) ||
          context.isPointInStroke(
            element.candle.line,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          )
        ) {
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
        if (
          context.isPointInPath(
            element.candle.rect,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          ) ||
          context.isPointInStroke(
            element.candle.line,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY
          )
        ) {
          setCursorStyle(true);
          //   setCandleIndex([candleList2D.indexOf(element)]);
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

  const data = intervals.map((element, index) => (
    <TimePicker
      key={uniqid()}
      isActive={element === activePicker ? true : false}
      onClick={(event) =>
        onSwitchClickHandler({ interval: element, isMobile: isMobile }, event)
      }>
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  data.unshift(<TimePickerHeader key={uniqid()} />);

  useEffect(() => {
    console.log(candleIndex);
    if (candleData === null && isMobile !== null) {
      fetchData({ interval: '15m', isMobile: isMobile });
    }
    // if (candleData && candleIndex === null && candleList2D !== null) {
    //   const context = document.getElementById(canvasId).getContext('2d');
    //   setCandleIndex(candleData.length - 1);
    //   setSelectedColor(candleList2D[candleList2D.length - 1], context, colors);
    // }
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
                {candleIndex
                  ? getDate(candleData[candleIndex][0], isMobile)
                  : null}
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
                firstArg={
                  candleIndex
                    ? parseFloat(candleData[candleIndex][1]).toFixed(2)
                    : null
                }
                secondArg={
                  candleIndex
                    ? parseFloat(candleData[candleIndex][4]).toFixed(2)
                    : null
                }
              />
              <DataItem
                isMobile={isMobile}
                header={'High/Low'}
                firstArg={
                  candleIndex
                    ? parseFloat(candleData[candleIndex][2]).toFixed(2)
                    : null
                }
                secondArg={
                  candleIndex
                    ? parseFloat(candleData[candleIndex][3]).toFixed(2)
                    : null
                }
              />
              <DataItem
                isMobile={isMobile}
                header={isMobile ? 'Chage/Ampl' : 'Change/Amplitude'}
                firstArg={
                  candleIndex
                    ? `${(
                        (parseFloat(candleData[candleIndex][1]) /
                          parseFloat(candleData[candleIndex][4])) *
                          100 -
                        100
                      ).toFixed(2)}%`
                    : null
                }
                secondArg={
                  candleIndex
                    ? `${(
                        (parseFloat(candleData[candleIndex][2]) /
                          parseFloat(candleData[candleIndex][3])) *
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
