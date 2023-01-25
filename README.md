## Candlestick Chart Widget
![Screenshot 2023-01-25 at 19 56 59](https://user-images.githubusercontent.com/16167616/214628891-8a00cf96-31b9-4274-8657-bf835f2ab8e6.png)

[View Live](https://AndreyKonovalenko.github.io/candlestick-chart-widget)

This is my React implementation of a candlestick chart widget.
It shows the change in the price of ethereum against the dollar at different time intervals.
The data is requested through the Binance API and displayed in real time on the chart.

Inspired by front-end case on casetech.ru

## Features

- 5 time intervals to choose from;
- events:
  - clicking on each candlestick cause updating data columns (open/close, high/low, change/amplitude);
- responsive layout:
  - desktop version (32 candlesticks);
  - mobile version (21 candlesticks).

