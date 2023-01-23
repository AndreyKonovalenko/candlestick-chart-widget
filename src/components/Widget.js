import { useState, useEffect, useCallback } from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";
import usePreviusValue from "../hooks/usePreviusValue";
import PriceChart from "./PriceChart";
import Display from "./display/Display";
import DisplayHeader from "./display/DisplayHeader";
import DisplayHeaderItem from "./display/DisplayHeaderItem";
import TimeSwitch from "./timeSwitch/TimeSwitch";
import TimePicker from "./timeSwitch/TimePicker";
import TimePickerHeader from "./timeSwitch/TimePickerHeader";
import DataColumns from "./display/dataColumns/DataColumns";
import DataItem from "./display/dataColumns/DataItem";
import ChartContainer from "./display/chart/ChartContainer";
import Layout from "./Layout";
import {
  fetchData,
  setDate,
  setOpen,
  setClose,
  setHigh,
  setLow,
  setChange,
  setAmplitude,
} from "../utils/utils";
import {
  drawChart,
  setSelectedColor,
  setDefaultColor,
  pointInPath,
} from "../utils/chart";

import axios from "axios";
import uniqid from "uniqid";
import theme from "../theme/theme";

axios.defaults.baseURL = "https://api.binance.com/";
const Widget = () => {
  const canvasId = "candlestick-chart";
  const { colors } = theme;
  const isMobile = useDeviceDetect();
  const prevScreen = usePreviusValue(isMobile);
  const intervals = ["15m", "1h", "4h", "1d", "1w"];
  const [candleData, setCandleData] = useState(null);
  const [spread, setSpread] = useState(null);
  const [candleList2D, setCandleList2D] = useState(null);
  const [activePicker, setActivePicker] = useState("15m");
  const [candleIndex, setCandleIndex] = useState(isMobile ? 20 : 31);
  const [cursorStyle, setCursorStyle] = useState(false);

  const resetState = useCallback(() => {
    setCandleData(null);
    setCandleIndex(isMobile ? 20 : 31);
    setCandleList2D(null);
  }, [isMobile]);

  const onSwitchClickHandler = (data) => {
    setActivePicker(data.interval);
    resetState();
    fetchData(data);
  };

  const onCandleSelectHandler = (candleList2D, event) => {
    const context = document.getElementById(canvasId).getContext("2d");
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
    const context = document.getElementById(canvasId).getContext("2d");
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
      }
    >
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  switchBar.unshift(<TimePickerHeader key={uniqid()} />);

  useEffect(() => {
    console.log(isMobile, prevScreen);
    if (candleData === null) {
      fetchData(
        { interval: activePicker, isMobile: isMobile },
        setCandleData,
        setSpread,
        setCandleIndex
      );
    }
    if (isMobile !== prevScreen && prevScreen !== undefined) {
      console.log("re-render PrevScren");
      resetState();
    }

    if (
      candleData !== null &&
      spread !== null &&
      candleIndex !== null &&
      candleList2D === null
    ) {
      if (candleIndex < candleData.length) {
        setCandleList2D(
          drawChart(spread, candleData, canvasId, colors, candleIndex)
        );
      } else {
        resetState();
      }
    }
  }, [
    activePicker,
    candleData,
    candleIndex,
    candleList2D,
    colors,
    cursorStyle,
    isMobile,
    prevScreen,
    resetState,
    spread,
  ]);

  const widget = (
    <Layout isMobile={isMobile}>
      <PriceChart isMobile={isMobile}>
        <Display isMobile={isMobile}>
          <DisplayHeader isMobile={isMobile}>
            <DisplayHeaderItem isMobile={isMobile}>
              ETH/USDT Price Chart
            </DisplayHeaderItem>
            <DisplayHeaderItem isMobile={isMobile} altColor>
              {candleData !== null
                ? setDate(candleIndex, candleData, isMobile)
                : "Loading..."}
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
              header={"Open/Close"}
              firstArg={
                candleData !== null
                  ? setOpen(candleIndex, candleData)
                  : "0000.00"
              }
              secondArg={
                candleData !== null
                  ? setClose(candleIndex, candleData)
                  : "0000.00"
              }
            />
            <DataItem
              isMobile={isMobile}
              header={"High/Low"}
              firstArg={
                candleData !== null
                  ? setHigh(candleIndex, candleData)
                  : "0000.00"
              }
              secondArg={
                candleData !== null
                  ? setLow(candleIndex, candleData)
                  : "0000.00"
              }
            />
            <DataItem
              isMobile={isMobile}
              header={isMobile ? "Chage/Ampl" : "Change/Amplitude"}
              firstArg={
                candleData !== null
                  ? setChange(candleIndex, candleData)
                  : "00.00"
              }
              secondArg={
                candleData !== null
                  ? setAmplitude(candleIndex, candleData)
                  : "00.00"
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
