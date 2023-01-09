const CandleContainer = (props) => {
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

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.rect(0, 0, 7, 20);
  ctx.fillStyle = "#BC1C34";
  ctx.stroke();

  return (
    <div style={styles.candleContainer}>
      <canvas id="canvas"></canvas>
    </div>
  );
};
export default CandleContainer;
