import { useState, useEffect } from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";
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
  findMaxMin,
  getDate,
  setSelectedColor,
  setDefaultColor,
} from "../utils/utils";
import { drawChart } from "../utils/drawChart";

import axios from "axios";
import uniqid from "uniqid";
import theme from "../theme/theme";

axios.defaults.baseURL = "https://api.binance.com/";

const Widget = () => {
  const canvasId = "candlestick-chart";
  const { colors } = theme;
  const intervals = ["15m", "1h", "4h", "1d", "1w"];
  const isMobile = useDeviceDetect();
  const [candleList, setCandleList] = useState(null);
  const [cursorStyle, setCursorStyle] = useState(false);
  const [activePicker, setActivePicker] = useState("15m");
  const [candleIsSelected, setCandleIsSelected] = useState(null);
  const [candleData, setCandleData] = useState(null);
  const [spread, setSpread] = useState(null);

  //axios
  const fetchData = (data) => {
    axios
      .get("/api/v3/klines", {
        params: {
          symbol: "ETHUSDT",
          interval: data.interval,
          limit: data.isMobile ? "21" : "32",
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
        console.log("loading complited!");
      });
  };

  const onSwitchClickHandler = (data) => {
    setCandleList(null);
    fetchData(data);
    setActivePicker(data.interval);
  };

  const onCandleSelectHandler = (element) => {
    setCandleIsSelected(element);
  };

  const onCanvasClickHandler = (candleList, event) => {
    const context = document.getElementById(canvasId).getContext("2d");
    if (candleList !== null) {
      for (const element of candleList) {
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
          setCandleIsSelected(candleData[candleList.indexOf(element)]);
          setSelectedColor(element, context, colors);
          return;
        } else {
          setDefaultColor(element, context, colors);
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
      }
    >
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  data.unshift(<TimePickerHeader key={uniqid()} />);

  useEffect(() => {
    if (candleData === null && isMobile !== null) {
      console.log(isMobile);
      fetchData({ interval: "15m", isMobile: isMobile });
    }
    if (candleData && candleIsSelected === null && candleList !== null) {
      const context = document.getElementById(canvasId).getContext("2d");
      setCandleIsSelected(candleData[candleData.length - 1]);
      setSelectedColor(candleList[candleList.length - 1], context, colors);
    }
    if (candleData !== null && spread !== null && candleList === null) {
      setCandleList(drawChart(spread, candleData, canvasId, colors));
    }
  }, [
    candleData,
    candleIsSelected,
    candleList,
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
                {candleIsSelected
                  ? getDate(candleIsSelected[0], isMobile)
                  : null}
              </DisplayHeaderItem>
            </DisplayHeader>
            <ChartContainer
              cursorStyle={cursorStyle}
              isMobile={isMobile}
              id={canvasId}
              onMouseMoveCapture={(event) =>
                onCanvasClickHandler(candleList, event)
              }
            />
            <DataColumns isMobile={isMobile}>
              <DataItem
                isMobile={isMobile}
                header={"Open/Close"}
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
                header={"High/Low"}
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
                header={isMobile ? "Chage/Ampl" : "Change/Amplitude"}
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
