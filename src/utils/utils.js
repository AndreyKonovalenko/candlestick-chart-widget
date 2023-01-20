export const findMaxMin = (arr) => {
  const highest = arr.reduce((prev, cur) => {
    return parseFloat(cur[2]) > parseFloat(prev[2]) ? cur : prev;
  });
  const lowest = arr.reduce((prev, cur) =>
    parseFloat(cur[3]) < parseFloat(prev[3]) ? cur : prev
  );
  const max = parseFloat(highest[2]);
  const min = parseFloat(lowest[3]);
  const spread = max - min;
  return {
    max: max,
    min: min,
    spread: spread,
  };
};

export const getDate = (date, isMobile) => {
  const newDate = new Date(date);
  const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
    newDate
  );
  const month = new Intl.DateTimeFormat("en-US", {
    month: isMobile ? "short" : "long",
  }).format(newDate);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(newDate);

  return `${day} ${month} ${time}`;
};

export const setSelectedColor = (element, context, colors) => {
  if (element.type === "bullish") {
    context.fillStyle = colors.display.chart.bullishSelected;
    context.strokeStyle = colors.display.chart.bullishSelected;
  }
  if (element.type === "bearish") {
    context.fillStyle = colors.display.chart.bearishSelected;
    context.strokeStyle = colors.display.chart.bearishSelected;
  }
  context.fill(element.candle.rect);
  context.stroke(element.candle.line);
};

export const setDefaultColor = (element, context, colors) => {
  if (element.type === "bullish") {
    context.fillStyle = colors.display.chart.bullish;
    context.strokeStyle = colors.display.chart.bullish;
  }
  if (element.type === "bearish") {
    context.fillStyle = colors.display.chart.bearish;
    context.strokeStyle = colors.display.chart.bearish;
  }
  context.fill(element.candle.rect);
  context.stroke(element.candle.line);
};
