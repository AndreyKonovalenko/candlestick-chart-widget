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
  const yLine0 = (spread.max - high) / step;
  const yLine1 = (spread.max - low) / step;

  // open price >= close price

  const yRect0 =
    open >= close ? (spread.max - open) / step : (spread.max - close) / step;
  const yRect1 =
    open >= close ? (spread.max - close) / step : (spread.max - open) / step;

  useEffect(() => {
    const draw = (ctx) => {
      ctx.strokeStyle = open >= close ? "#72ED93" : "#BC1C34";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(4, yLine0);
      ctx.lineTo(4, yLine1);
      ctx.stroke();
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(0, yRect0);
      ctx.lineTo(0, yRect1);
      ctx.stroke();
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  });

  return (
    // <div style={styles.candleContainer}>
    //   <canvas ref={canvasRef} width="15" height="115"></canvas>
    // </div>
    <canvas ref={canvasRef} width="7" height="115"></canvas>
  );
};
export default CandleContainer;
