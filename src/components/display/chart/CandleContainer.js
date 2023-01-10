import { useRef, useEffect } from 'react';
const CandleContainer = (props) => {
  const canvasRef = useRef(null);
  const { spread, open, high, low, close } = props;
  // const styles = {
  //   candleContainer: {
  //     width: '15px',
  //     height: '115px',
  //     flex: 'none',
  //     order: '1',
  //     flexGrow: '0',
  //   },
  // };

  const step = spread.spread / 115; // means canvas height in px =  115px
  const yLine0 = Math.round((spread.max - high) / step);
  const yLine1 = Math.round((spread.max - low) / step);

  // open price >= close price

  const yRect0 = Math.round(
    open >= close ? (spread.max - open) / step : (spread.max - close) / step
  );

  const rectHeight = Math.round(
    open >= close ? (open - close) / step : (close - open) / step
  );
  console.log(yLine1, rectHeight);

  useEffect(() => {
    const draw = (ctx) => {
      ctx.strokeStyle = open >= close ? '#72ED93' : '#BC1C34';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(3.5, yLine0);
      ctx.lineTo(3.5, yLine1);
      ctx.stroke();
      ctx.fillStyle = open >= close ? '#72ED93' : '#BC1C34';
      ctx.fillRect(0, yRect0, 7, rectHeight > 0 ? rectHeight : 1);
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  });

  return (
    // <div style={styles.candleContainer}>
    //   <canvas ref={canvasRef} width="15" height="115"></canvas>
    // </div>
    <canvas ref={canvasRef} width='7' height='115'></canvas>
  );
};
export default CandleContainer;
