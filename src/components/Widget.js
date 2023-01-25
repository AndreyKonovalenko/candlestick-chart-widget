import axios from 'axios';
import uniqid from 'uniqid';
import { useState, useEffect } from 'react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import usePreviusValue from '../hooks/usePreviusValue';
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
  fetchData,
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
  clearChart,
  setSelectedColor,
  setDefaultColor,
  pointInPath,
} from '../utils/chart';
import theme from '../theme/theme';

axios.defaults.baseURL = 'https://api.binance.com/';
const Widget = () => {
  const canvasId = 'candlestick-chart';
  const { colors } = theme;
  const { isMobile, isRetina, isLandscape, isMobileDevice } = useDeviceDetect();
  const prevScreen = usePreviusValue(isMobile);
  const intervals = ['15m', '1h', '4h', '1d', '1w'];
  const [activePicker, setActivePicker] = useState('15m');
  const [candleData, setCandleData] = useState(null);
  const [candleIndex, setCandleIndex] = useState(0);
  const [candleList2D, setCandleList2D] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(false);

  const resetState = () => {
    clearChart(canvasId);
    setCandleData(null);
    setCandleIndex(0);
    setCandleList2D(null);
  };

  const onSwitchClickHandler = (data) => {
    clearChart(canvasId);
    setActivePicker(data.interval);
    resetState();
    fetchData(data, setCandleData, setCandleIndex);
  };

  const onCandleSelectHandler = (candleList2D, event) => {
    const context = document.getElementById(canvasId).getContext('2d');
    if (candleList2D !== null) {
      for (const element of candleList2D) {
        if (pointInPath(element, context, event)) {
          setDefaultColor(candleList2D[candleIndex], context, colors);
          setCandleIndex(candleList2D.indexOf(element));
          setSelectedColor(element, context, colors);
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
    if (isMobile !== prevScreen && prevScreen !== undefined) {
      resetState();
    }
    if (candleData === null) {
      fetchData(
        { interval: activePicker, isMobile: isMobile },
        setCandleData,
        setCandleIndex
      );
    }
    if (candleData !== null) {
      if (candleData.length === 21 && isMobile === false) {
        resetState();
      }
      if (candleData.length === 32 && isMobile === true) {
        resetState();
      }
    }
    if (candleData !== null && candleIndex !== null && candleList2D === null) {
      setCandleList2D(drawChart(candleData, canvasId, colors, candleIndex));
    }
  }, [
    activePicker,
    candleData,
    candleIndex,
    candleList2D,
    colors,
    cursorStyle,
    isMobile,
    isMobileDevice,
    prevScreen,
  ]);

  const widget = (
    <Layout isMobile={isMobile} isRetina={isRetina} isLandscape={isLandscape}>
      <PriceChart isMobile={isMobile}>
        <Display isMobile={isMobile}>
          <DisplayHeader isMobile={isMobile}>
            <DisplayHeaderItem isMobile={isMobile}>
              ETH/USDT Price Chart
            </DisplayHeaderItem>
            <DisplayHeaderItem isMobile={isMobile} altColor>
              {candleData !== null
                ? setDate(candleIndex, candleData, isMobile)
                : 'Loading...'}
            </DisplayHeaderItem>
          </DisplayHeader>
          <ChartContainer
            cursorStyle={cursorStyle}
            isMobile={isMobile}
            id={canvasId}
            onMouseMove={
              isMobileDevice
                ? () => {}
                : (event) => onCanvasHoverHandler(candleList2D, event)
            }
            onClick={(event) => onCandleSelectHandler(candleList2D, event)}
          />
          <DataColumns isMobile={isMobile}>
            <DataItem
              isMobile={isMobile}
              header={'Open/Close'}
              firstArg={
                candleData !== null ? setOpen(candleIndex, candleData) : null
              }
              secondArg={
                candleData !== null ? setClose(candleIndex, candleData) : null
              }
            />
            <DataItem
              isMobile={isMobile}
              header={'High/Low'}
              firstArg={
                candleData !== null ? setHigh(candleIndex, candleData) : null
              }
              secondArg={
                candleData !== null ? setLow(candleIndex, candleData) : null
              }
            />
            <DataItem
              isMobile={isMobile}
              header={isMobile ? 'Chage/Ampl' : 'Change/Amplitude'}
              firstArg={
                candleData !== null ? setChange(candleIndex, candleData) : null
              }
              secondArg={
                candleData !== null
                  ? setAmplitude(candleIndex, candleData)
                  : null
              }
            />
          </DataColumns>
        </Display>
        <TimeSwitch isMobile={isMobile}>{switchBar}</TimeSwitch>
      </PriceChart>
    </Layout>
  );
  return widget;
};

export default Widget;
