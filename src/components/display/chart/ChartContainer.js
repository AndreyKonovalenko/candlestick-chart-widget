const ChartContainer = (props) => {
  const { isMobile, onMouseMoveCapture, onClick, id, cursorStyle } = props;

  return (
    <canvas
      id={id}
      style={{ cursor: !cursorStyle ? 'default' : 'pointer' }}
      width={isMobile ? '315' : '480'}
      height='115'
      onMouseMoveCapture={onMouseMoveCapture}
      onClick={onClick}
    />
  );
};
export default ChartContainer;
