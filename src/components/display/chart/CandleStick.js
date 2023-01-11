import { useRef, useEffect } from 'react';
import theme from '../../../theme/theme';

const CandleStick = (props) => {
  const canvasRef = useRef(null);
  const { spread, open, high, low, close, onClick, isSelected } = props;
  const { candleColors } = theme;
  const styles = {
    canvas: {
      cursor: 'pointer',
    },
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
      ctx.strokeStyle =
        open >= close
          ? !isSelected
            ? candleColors.bullish
            : candleColors.bullishSelected
          : !isSelected
          ? candleColors.bearish
          : candleColors.bearishSelected;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(3.5, yLine0);
      ctx.lineTo(3.5, yLine1);
      ctx.stroke();
      ctx.fillStyle =
        open >= close
          ? !isSelected
            ? candleColors.bullish
            : candleColors.bullishSelected
          : !isSelected
          ? candleColors.bearish
          : candleColors.bearishSelected;
      ctx.fillRect(0, yRect0, 7, rectHeight > 0 ? rectHeight : 1);
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context, isSelected);
  }, [
    candleColors.bearish,
    candleColors.bearishSelected,
    candleColors.bullish,
    candleColors.bullishSelected,
    close,
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
export default CandleStick;
