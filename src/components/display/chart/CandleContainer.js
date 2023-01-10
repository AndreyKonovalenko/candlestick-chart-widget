import { useRef, useEffect } from "react";
const CandleContainer = (props) => {
  const canvasRef = useRef(null);
  const { spread, open, high, low, close } = props;
  const styles = {
    candleContainer: {
      width: "15px",
      height: "115px",
      flex: "none",
      order: "1",
      flexGrow: "0",
    },
  };

  const step = spread.spread / 115; // means canvas height in px =  115px
  console.log(spread.max, spread.min, spread.spread, high, step);
  const y0 = (spread.max - high) / step;
  const y1 = (spread.max - low) / step;

  // open price >= close price

  const y =
    open >= close ? (spread.max - open) / step : (spread.max - close) / step;
  const height = open >= close ? (open - close) / step : (close - open) / step;

  useEffect(() => {
    const draw = (ctx) => {
      ctx.beginPath();
      ctx.moveTo(8, y0);
      ctx.lineTo(8, y1);
      ctx.lineWidth = 1;
      ctx.strokeStyle = open >= close ? "#72ED93" : "#BC1C34";
      ctx.stroke();
      // ctx.beginPath();
      ctx.beginPath();
      ctx.fillRect(4, y, 7, height);
      ctx.fillStyle = open >= close ? "#72ED93" : "#BC1C34";
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  });

  return (
    // <div style={styles.candleContainer}>
    //   <canvas ref={canvasRef} width="15" height="115"></canvas>
    // </div>
    <canvas ref={canvasRef} width="15" height="115"></canvas>
  );
};
export default CandleContainer;
