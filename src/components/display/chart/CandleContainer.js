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
  const y = (spread.max - high) / step;
  const height = (high - low) / step;
  console.log(step, y);

  useEffect(() => {
    const draw = (ctx) => {
      ctx.beginPath();
      // ctx.fillStyle = "#BC1C34";
      //   ctx.moveTo(x, this.data[i].h);

      ctx.moveTo(8, y);
      ctx.lineTo(8, height);
      // ctx.lineWidth = 1;
      ctx.strokeStyle = "#BC1C34";
      ctx.stroke();
      // ctx.fillRect(4, y, 7, height);
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
