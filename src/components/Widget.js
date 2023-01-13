import { useState, useEffect } from "react";
import useDeviceDetect from "./hooks/useDeviceDetect";
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
import CandleStick from "./display/chart/CandleStick";
import { findMaxMin, getDate } from "../utils/utils";

import axios from "axios";
import uniqid from "uniqid";
axios.defaults.baseURL = "https://api.binance.com/";

const Widget = () => {
  const intervals = ["15m", "1h", "4h", "1d", "1w"];
  const { isMobile } = useDeviceDetect();
  const [active, setActive] = useState("15m");
  const [candleIsSelected, setCandleIsSelected] = useState(null);
  const [candleData, setCandleData] = useState(null);
  const [spread, setSpread] = useState(null);

  //axios
  const fetchData = (interval) => {
    axios
      .get("/api/v3/klines", {
        params: {
          symbol: "BTCUSDT",
          interval: interval,
          limit: "32",
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

  const onSwitchClickHandler = (interval) => {
    fetchData(interval);
    setActive(interval);
  };

  const onCandleSelectHandler = (element) => {
    setCandleIsSelected(element);
  };

  const data = intervals.map((element, index) => (
    <TimePicker
      key={uniqid()}
      isActive={element === active ? true : false}
      onClick={(event) => onSwitchClickHandler(element, event)}
    >
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
            onClick={(event) => onCandleSelectHandler(element, event)}
          ></CandleStick>
        ))
      : null;

  useEffect(() => {
    console.log("re-render main!");
    console.log("isMobale: ", isMobile);
    if (candleData === null) {
      fetchData("15m");
    }
    if (candleData && candleIsSelected === null) {
      setCandleIsSelected(candleData[candleData.length - 1]);
    }
  }, [candleData, candleIsSelected]);

  const widget = (
    <PriceChart>
      <Display>
        <DisplayHeader>
          <DisplayHeaderItem>BTC/USDT Price Chart</DisplayHeaderItem>
          <DisplayHeaderItem altColor>
            {candleIsSelected ? getDate(candleIsSelected[0]) : null}
          </DisplayHeaderItem>
        </DisplayHeader>
        <ChartContainer>{candleSticks}</ChartContainer>
        <DataColumns>
          <DataItem
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
            header={"Change/Amplitude"}
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
      <TimeSwitch>{data}</TimeSwitch>
    </PriceChart>
  );

  return widget;
};

export default Widget;
