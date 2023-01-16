import theme from '../theme/theme';
export const drawChart = (spread, items, id) => {
  const { colors } = theme;
  const open = items[1];
  const high = items[2];
  const low = items[3];
  const close = items[4];
  const step = spread.spread / 115; // price value in one px of canvas height.
  const yLine0 = Math.round((spread.max - high) / step);
  const yLine1 = Math.round((spread.max - low) / step);
  const yRect0 = Math.round(
    open >= close ? (spread.max - open) / step : (spread.max - close) / step
  );
  const rectHeight = Math.round(
    open >= close ? (open - close) / step : (close - open) / step
  );

  const drawCandle = (ctx) => {
    ctx.strokeStyle =
      open >= close
        ? colors.display.chart.bullish
        : colors.display.chart.bearish;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(3.5, yLine0);
    ctx.lineTo(3.5, yLine1);
    ctx.stroke();
    ctx.fillStyle =
      open >= close
        ? !colors.display.chart.bullish
        : colors.display.chart.bearish;
    ctx.fillRect(0, yRect0, 7, rectHeight > 0 ? rectHeight : 1);
  };
  // neeed add offset and position calculation
  const canvas = window.getActiveElementById(id);
  const context = canvas.getContext('2d');

  return drawCandle(context);
};
