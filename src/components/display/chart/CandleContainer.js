import { useRef, useEffect } from "react";
const CandleContainer = (props) => {
  const canvasRef = useRef(null);
  const { children } = props;
  const styles = {
    candleContainer: {
      width: "15px",
      height: "115px",
      flex: "none",
      order: "1",
      flexGrow: "0",
    },
  };

  const draw = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "#BC1C34";
    ctx.fillRect(0, 0, 7, 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context);
  }, [draw]);

  return (
    <div style={styles.candleContainer}>
      <canvas ref={canvasRef} width="15" height="115"></canvas>
    </div>
  );
};
export default CandleContainer;
