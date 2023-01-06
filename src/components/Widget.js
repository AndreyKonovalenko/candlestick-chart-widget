import { useState } from 'react';
import PriceChart from './PriceChart';
import Display from './display/Display';
import DisplayHeader from './display/DisplayHeader';
import DisplayHeaderItem from './display/DisplayHeaderItem';
import TimeSwitch from './timeSwitch/TimeSwitch';
import TimePicker from './timeSwitch/TimePicker';
import TimePickerHeader from './timeSwitch/TimePickerHeader';

import axios from 'axios';
import uniqid from 'uniqid';
axios.defaults.baseURL = 'https://api.binance.com/';

const Widget = () => {
  const intervals = ['15m', '1h', '4h', '1d', '1w'];
  const [active, setActive] = useState(null);

  const onSwitchClickHandler = (interval) => {
    axios
      .get('/api/v3/klines', {
        params: {
          symbol: 'BNBUSDT',
          interval: interval,
          limit: '32',
        },
      })
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('loading complited!, the shout set is loading');
      });
    setActive(interval);
  };

  const data = intervals.map((element, index) => (
    <TimePicker
      key={uniqid()}
      isActive={element === active ? true : false}
      onClick={(event) => onSwitchClickHandler(element, event)}>
      {index === 0 ? element : element.toUpperCase()}
    </TimePicker>
  ));

  data.unshift(<TimePickerHeader key={uniqid()} />);

  const widget = (
    <PriceChart>
      <Display>
        <DisplayHeader>
          <DisplayHeaderItem>BTC/USDT Price Chart</DisplayHeaderItem>
          <DisplayHeaderItem color={'#FFFFFF'}>
            23 Septemper 13:00
          </DisplayHeaderItem>
        </DisplayHeader>
      </Display>
      <TimeSwitch>{data}</TimeSwitch>
    </PriceChart>
  );

  return widget;
};

export default Widget;
