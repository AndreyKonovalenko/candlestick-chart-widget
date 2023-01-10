import { useState, useEffect } from "react";
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
import CandleContainer from "./display/chart/CandleContainer";
import { findMaxMin } from "./utils/utils";

import axios from "axios";
import uniqid from "uniqid";
axios.defaults.baseURL = "https://api.binance.com/";

const Widget = () => {
  const intervals = ["15m", "1h", "4h", "1d", "1w"];
  const [active, setActive] = useState(null);
  const [candleData, setCandleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [spread, setSpread] = useState(null);

  const onSwitchClickHandler = (interval) => {
    setIsLoading(true);
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
        setIsLoading(false);
        console.log("loading complited!, the shout set is loading");
      });
    setActive(interval);
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

  let candleSticks;
  if (candleData !== null && spread !== null) {
    candleSticks = candleData.map((element) => (
      <CandleContainer
        key={uniqid()}
        spread={spread}
        open={parseFloat(element[1])}
        high={parseFloat(element[2])}
        low={parseFloat(element[3])}
        close={parseFloat(element[4])}
      ></CandleContainer>
    ));
  }

  // useEffect(() => {
  // }, [isLoading, candleData]);

  const widget = (
    <PriceChart>
      <Display>
        <DisplayHeader>
          <DisplayHeaderItem>BTC/USDT Price Chart</DisplayHeaderItem>
          <DisplayHeaderItem color={"#FFFFFF"}>
            23 Septemper 13:00
          </DisplayHeaderItem>
        </DisplayHeader>
        <ChartContainer>
          {candleData !== null && spread !== null ? candleSticks : null}
        </ChartContainer>
        <DataColumns>
          <DataItem
            header={"Open/Close"}
            firstArg={"19730.36"}
            secondArg={"19782.39"}
          />
          <DataItem
            header={"High/Low"}
            firstArg={"19844.00"}
            secondArg={"19633.10"}
          />
          <DataItem
            header={"Change/Amplitude"}
            firstArg={"-1.06%"}
            secondArg={"0.26%"}
          />
        </DataColumns>
      </Display>
      <TimeSwitch>{data}</TimeSwitch>
    </PriceChart>
  );

  return widget;
};

export default Widget;
