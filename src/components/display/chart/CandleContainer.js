import { useRef, useEffect } from 'react';
const CandleContainer = (props) => {
  const canvasRef = useRef(null);
  const { spread, open, high, low, close, onClick, isSelected } = props;
  const styles = {
    canvas: {
      cursor: 'pointer',
    },
  };

  const colors = {
    bullish: '#72ED93',
    bearish: '#BC1C34',
    bullishSelected: '#CBFFD9',
    bearishSelected: '#ED6A7D',
  };

  const step = spread.spread / 115; // price value in one px of canvas height.
  const yLine0 = Math.round((spread.max - high) / step);
  const yLine1 = Math.round((spread.max - low) / step);

  const yRect0 = Math.round(
    open >= close ? (spread.max - open) / step : (spread.max - close) / step
  );

  const rectHeight = Math.round(
    open >= close ? (open - close) / step : (close - open) / step
  );

  useEffect(() => {
    const draw = (ctx, isSelected) => {
      console.log('inside Candle', isSelected);
      ctx.strokeStyle =
        open >= close
          ? !isSelected
            ? colors.bullish
            : colors.bullishSelected
          : !isSelected
          ? colors.bearish
          : colors.bearishSelected;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(3.5, yLine0);
      ctx.lineTo(3.5, yLine1);
      ctx.stroke();
      ctx.fillStyle =
        open >= close
          ? !isSelected
            ? colors.bullish
            : colors.bullishSelected
          : !isSelected
          ? colors.bearish
          : colors.bearishSelected;
      ctx.fillRect(0, yRect0, 7, rectHeight > 0 ? rectHeight : 1);
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, isSelected);
  }, [
    close,
    colors.bearish,
    colors.bearishSelected,
    colors.bullish,
    colors.bullishSelected,
    isSelected,
    open,
    rectHeight,
    yLine0,
    yLine1,
    yRect0,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={styles.canvas}
      width='7'
      height='115'
      onClick={onClick}></canvas>
  );
};
export default CandleContainer;
