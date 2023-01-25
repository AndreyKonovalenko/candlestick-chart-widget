const ChartContainer = (props) => {
  const { isMobile, onMouseMove, onClick, id, cursorStyle } = props;

  return (
    <canvas
      id={id}
      style={{ cursor: !cursorStyle ? 'default' : 'pointer' }}
      width={isMobile ? '315' : '480'}
      height='115'
      onMouseMove={onMouseMove}
      onClick={onClick}
    />
  );
};
export default ChartContainer;
