const culcCandleVerticalCoordinate = (spread, element, canvasHeight) => {
  const open = element[1];
  const high = element[2];
  const low = element[3];
  const close = element[4];
  const step = spread.spread / canvasHeight;
  const yLine0 = Math.round((spread.max - high) / step);
  const yLine1 = Math.round((spread.max - low) / step);
  const yRect0 = Math.round(
    open >= close ? (spread.max - open) / step : (spread.max - close) / step
  );
  const rectHeight = Math.round(
    open >= close ? (open - close) / step : (close - open) / step
  );
  return { yLine0, yLine1, yRect0, rectHeight, open, close };
};

const drawSingleCandle = (ctx, position, offset, colors, isSelected) => {
  const { yLine0, yLine1, yRect0, rectHeight, open, close } = position;
  const line = new Path2D();
  const rect = new Path2D();
  ctx.strokeStyle =
    open >= close
      ? isSelected
        ? colors.display.chart.bullishSelected
        : colors.display.chart.bullish
      : isSelected
      ? colors.display.chart.bullishSelected
      : colors.display.chart.bearish;
  ctx.lineWidth = 1;
  line.moveTo(offset + 3.5, yLine0);
  line.lineTo(offset + 3.5, yLine1);
  ctx.stroke(line);
  rect.rect(offset, yRect0, 7, rectHeight > 0 ? rectHeight : 1);
  ctx.fillStyle =
    open >= close
      ? isSelected
        ? colors.display.chart.bullishSelected
        : colors.display.chart.bullish
      : isSelected
      ? colors.display.chart.bullishSelected
      : colors.display.chart.bearish;
  ctx.fill(rect);
  return {
    candle: { rect: rect, line: line },
    type: open >= close ? 'bullish' : 'bearish',
  };
};

const draw = (ctx, items, spread, colors, isSelected) => {
  const candles = [];
  let offset = 4;
  for (const element of items) {
    const position = culcCandleVerticalCoordinate(
      spread,
      element,
      ctx.canvas.height
    );
    candles.push(
      drawSingleCandle(
        ctx,
        position,
        offset,
        colors,
        items.indexOf(element) === isSelected ? true : false
      )
    );
    offset = offset + 15;
  }
  return candles;
};

export const drawChart = (spread, items, id, colors, isSelected) => {
  const canvas = document.getElementById(id);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  return draw(context, items, spread, colors, isSelected);
};
